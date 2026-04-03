"use client"

import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html, Outlines } from "@react-three/drei"
import { XRButton, createXRStore, XR } from "@react-three/xr"
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

// ─── Types ───────────────────────────────────────────────────────
interface PartInfo {
  name: string
  vertices: number
  faces: number
  size: string
}

// ─── Helpers ─────────────────────────────────────────────────────
function getPartInfo(mesh: THREE.Mesh): PartInfo {
  const geo = mesh.geometry
  geo.computeBoundingBox()
  const bb = geo.boundingBox!
  const s = new THREE.Vector3()
  bb.getSize(s)
  return {
    name: mesh.name || mesh.uuid.slice(0, 8),
    vertices: geo.attributes.position?.count ?? 0,
    faces: geo.index ? geo.index.count / 3 : (geo.attributes.position?.count ?? 0) / 3,
    size: `${s.x.toFixed(2)} × ${s.y.toFixed(2)} × ${s.z.toFixed(2)}`,
  }
}

// Store original materials so we can restore them
const originalMaterials = new WeakMap<THREE.Mesh, THREE.Material | THREE.Material[]>()

function storeOriginalMaterial(mesh: THREE.Mesh) {
  if (!originalMaterials.has(mesh)) {
    if (Array.isArray(mesh.material)) {
      originalMaterials.set(mesh, mesh.material.map((m) => m.clone()))
    } else {
      originalMaterials.set(mesh, mesh.material.clone())
    }
  }
}

// ─── GLB Model — preserves full scene hierarchy ──────────────────
function MRIGLBModel({
  isDark,
  selectedPart,
  hoveredPart,
  isolatedPart,
  onSelectPart,
  onHoverPart,
  onUnhoverPart,
}: {
  isDark: boolean
  selectedPart: string | null
  hoveredPart: string | null
  isolatedPart: string | null
  onSelectPart: (name: string, info: PartInfo) => void
  onHoverPart: (name: string) => void
  onUnhoverPart: () => void
}) {
  const { scene } = useGLTF("/MRI.glb")
  const groupRef = useRef<THREE.Group>(null)

  // Clone scene once to avoid modifying cached original
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    // Give every mesh a unique name if it doesn't have one
    let idx = 0
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (!child.name) child.name = `Part ${idx + 1}`
        idx++
        // Clone materials so each mesh has its own
        if (Array.isArray(child.material)) {
          child.material = (child.material as THREE.Material[]).map((m) => m.clone())
        } else {
          child.material = child.material.clone()
        }
        storeOriginalMaterial(child)
      }
    })
    return clone
  }, [scene])

  // Update materials every frame based on hover/select/isolate state
  useFrame(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const name = child.name
      const isSelected = selectedPart === name
      const isHovered = hoveredPart === name
      const isIsolated = isolatedPart !== null && isolatedPart !== name

      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          // Emissive
          const baseEmissive = isDark ? "#3b82f6" : "#06b6d4"
          const selectedEmissive = isDark ? "#f59e0b" : "#f97316"
          mat.emissive.set(isSelected ? selectedEmissive : baseEmissive)
          mat.emissiveIntensity = isSelected ? 0.6 : isHovered ? 0.45 : isDark ? 0.2 : 0.1

          // Opacity for isolation
          mat.transparent = true
          mat.opacity = isIsolated ? 0.06 : 1
          mat.depthWrite = !isIsolated

          mat.metalness = isSelected ? 0.95 : 0.8
          mat.roughness = isSelected ? 0.1 : 0.2
          mat.needsUpdate = true
        }
      })
    })
  })

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 4, 0]}
      scale={2}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        if (e.object instanceof THREE.Mesh && e.object.name) {
          onHoverPart(e.object.name)
          document.body.style.cursor = "pointer"
        }
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        onUnhoverPart()
        document.body.style.cursor = "auto"
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        if (e.object instanceof THREE.Mesh) {
          const info = getPartInfo(e.object)
          onSelectPart(info.name, info)
        }
      }}
    >
      <primitive object={clonedScene} />
    </group>
  )
}

// ─── FBX-style Model — per-mesh interactive ──────────────────────
const FBX_PARTS = [
  { name: "Scanner Housing", type: "box" as const },
  { name: "Brain Cortex", type: "sphere" as const },
  { name: "Scan Plane 1", type: "plane" as const, index: 0 },
  { name: "Scan Plane 2", type: "plane" as const, index: 1 },
  { name: "Scan Plane 3", type: "plane" as const, index: 2 },
  { name: "Scan Plane 4", type: "plane" as const, index: 3 },
  { name: "Scan Plane 5", type: "plane" as const, index: 4 },
]

function FBXInteractivePart({
  part,
  isDark,
  isSelected,
  isHovered,
  isIsolated,
  onHover,
  onUnhover,
  onSelect,
}: {
  part: (typeof FBX_PARTS)[number]
  isDark: boolean
  isSelected: boolean
  isHovered: boolean
  isIsolated: boolean
  onHover: () => void
  onUnhover: () => void
  onSelect: () => void
}) {
  const opacity = isIsolated ? 0.06 : 1
  const extraEmissive = (isHovered ? 0.15 : 0) + (isSelected ? 0.3 : 0)

  const pointerHandlers = {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      onHover()
      document.body.style.cursor = "pointer"
    },
    onPointerOut: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      onUnhover()
      document.body.style.cursor = "auto"
    },
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      onSelect()
    },
  }

  if (part.type === "box") {
    return (
      <mesh {...pointerHandlers}>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial
          color={isDark ? "#1f2937" : "#f3f4f6"}
          emissive={isDark ? "#8b5cf6" : "#ec4899"}
          emissiveIntensity={0.3 + extraEmissive}
          metalness={0.7}
          roughness={0.3}
          wireframe
          transparent
          opacity={opacity}
        />
        {isSelected && <Outlines thickness={3} color={isDark ? "#facc15" : "#f97316"} />}
        {isHovered && !isSelected && (
          <Outlines thickness={1.5} color={isDark ? "#c084fc" : "#ec4899"} />
        )}
      </mesh>
    )
  }

  if (part.type === "sphere") {
    return (
      <mesh {...pointerHandlers}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? "#111827" : "#ffffff"}
          emissive={isDark ? "#10b981" : "#059669"}
          emissiveIntensity={0.5 + extraEmissive}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={opacity}
        />
        {isSelected && <Outlines thickness={3} color={isDark ? "#facc15" : "#f97316"} />}
        {isHovered && !isSelected && (
          <Outlines thickness={1.5} color={isDark ? "#34d399" : "#059669"} />
        )}
      </mesh>
    )
  }

  // Scan plane
  const planeIdx = part.index ?? 0
  return (
    <mesh position={[0, -0.8 + planeIdx * 0.4, 0]} {...pointerHandlers}>
      <planeGeometry args={[1.2, 1.2]} />
      <meshStandardMaterial
        color={isDark ? "#3b82f6" : "#60a5fa"}
        emissive={isDark ? "#3b82f6" : "#60a5fa"}
        emissiveIntensity={extraEmissive}
        transparent
        opacity={isIsolated ? 0.04 : isHovered || isSelected ? 0.6 : 0.3}
        side={THREE.DoubleSide}
      />
      {isSelected && <Outlines thickness={2} color={isDark ? "#facc15" : "#f97316"} />}
    </mesh>
  )
}

function MRIFBXModel({
  isDark,
  selectedPart,
  hoveredPart,
  isolatedPart,
  onSelectPart,
  onHoverPart,
  onUnhoverPart,
}: {
  isDark: boolean
  selectedPart: string | null
  hoveredPart: string | null
  isolatedPart: string | null
  onSelectPart: (name: string, info: PartInfo) => void
  onHoverPart: (name: string) => void
  onUnhoverPart: () => void
}) {
  const geoStats: Record<string, { vertices: number; faces: number; size: string }> = {
    "Scanner Housing": { vertices: 24, faces: 12, size: "1.50 × 2.00 × 1.50" },
    "Brain Cortex": { vertices: 1089, faces: 1024, size: "1.20 × 1.20 × 1.20" },
    "Scan Plane 1": { vertices: 4, faces: 2, size: "1.20 × 1.20 × 0.00" },
    "Scan Plane 2": { vertices: 4, faces: 2, size: "1.20 × 1.20 × 0.00" },
    "Scan Plane 3": { vertices: 4, faces: 2, size: "1.20 × 1.20 × 0.00" },
    "Scan Plane 4": { vertices: 4, faces: 2, size: "1.20 × 1.20 × 0.00" },
    "Scan Plane 5": { vertices: 4, faces: 2, size: "1.20 × 1.20 × 0.00" },
  }

  return (
    <group position={[3, 0, -2]} rotation={[0, -Math.PI / 3, 0]}>
      {FBX_PARTS.map((part) => {
        const stats = geoStats[part.name]
        return (
          <FBXInteractivePart
            key={part.name}
            part={part}
            isDark={isDark}
            isSelected={selectedPart === part.name}
            isHovered={hoveredPart === part.name}
            isIsolated={isolatedPart !== null && isolatedPart !== part.name}
            onHover={() => onHoverPart(part.name)}
            onUnhover={onUnhoverPart}
            onSelect={() =>
              onSelectPart(part.name, {
                name: part.name,
                vertices: stats?.vertices ?? 0,
                faces: stats?.faces ?? 0,
                size: stats?.size ?? "—",
              })
            }
          />
        )
      })}
    </group>
  )
}

// ─── Scene ───────────────────────────────────────────────────────
function Scene({
  isDark,
  selectedPart,
  hoveredPart,
  isolatedPart,
  onSelectPart,
  onHoverPart,
  onUnhoverPart,
}: {
  isDark: boolean
  selectedPart: string | null
  hoveredPart: string | null
  isolatedPart: string | null
  onSelectPart: (name: string, info: PartInfo) => void
  onHoverPart: (name: string) => void
  onUnhoverPart: () => void
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color={isDark ? "#3b82f6" : "#60a5fa"} />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.5}
        color={isDark ? "#8b5cf6" : "#a78bfa"}
      />
      <spotLight position={[0, 10, 0]} intensity={0.3} color={isDark ? "#06b6d4" : "#22d3ee"} />

      {/* Environment */}
      <Environment preset={isDark ? "night" : "city"} />

      {/* Models */}
      <MRIGLBModel
        isDark={isDark}
        selectedPart={selectedPart}
        hoveredPart={hoveredPart}
        isolatedPart={isolatedPart}
        onSelectPart={onSelectPart}
        onHoverPart={onHoverPart}
        onUnhoverPart={onUnhoverPart}
      />
      <MRIFBXModel
        isDark={isDark}
        selectedPart={selectedPart}
        hoveredPart={hoveredPart}
        isolatedPart={isolatedPart}
        onSelectPart={onSelectPart}
        onHoverPart={onHoverPart}
        onUnhoverPart={onUnhoverPart}
      />

      {/* Grid helper */}
      <gridHelper
        args={[20, 20, isDark ? "#374151" : "#d1d5db", isDark ? "#1f2937" : "#e5e7eb"]}
        position={[0, -2, 0]}
      />

      {/* Orbit controls — stop auto-rotate when a part is selected */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={selectedPart === null}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={15}
      />
    </>
  )
}

// ─── Loading fallback ────────────────────────────────────────────
function Loader({ isDark }: { isDark: boolean }) {
  return (
    <Html center>
      <div
        className={`flex flex-col items-center gap-3 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`h-8 w-8 rounded-full border-2 border-t-transparent ${
            isDark ? "border-blue-400" : "border-blue-600"
          }`}
        />
        <span className="text-sm font-medium">Loading 3D Scene...</span>
      </div>
    </Html>
  )
}

// ─── Info Panel ──────────────────────────────────────────────────
function InfoPanel({
  isDark,
  partInfo,
  isIsolated,
  onIsolate,
  onReset,
  onClose,
}: {
  isDark: boolean
  partInfo: PartInfo
  isIsolated: boolean
  onIsolate: () => void
  onReset: () => void
  onClose: () => void
}) {
  const bg = isDark ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
  const textPrimary = isDark ? "text-gray-100" : "text-gray-900"
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500"
  const accent = isDark ? "text-amber-400" : "text-orange-500"
  const btnBase =
    "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer"

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`absolute right-4 top-4 z-20 w-72 rounded-xl border shadow-2xl backdrop-blur-sm ${bg}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between border-b px-4 py-3 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isDark ? "bg-amber-400" : "bg-orange-500"}`} />
          <span className={`text-sm font-bold ${accent}`}>{partInfo.name}</span>
        </div>
        <button
          onClick={onClose}
          className={`rounded-md p-1 transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Stats */}
      <div className="space-y-2 px-4 py-3">
        <div className="flex justify-between">
          <span className={`text-xs ${textSecondary}`}>Vertices</span>
          <span className={`text-xs font-mono font-semibold ${textPrimary}`}>
            {partInfo.vertices.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={`text-xs ${textSecondary}`}>Faces</span>
          <span className={`text-xs font-mono font-semibold ${textPrimary}`}>
            {Math.round(partInfo.faces).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={`text-xs ${textSecondary}`}>Bounding Box</span>
          <span className={`text-xs font-mono font-semibold ${textPrimary}`}>{partInfo.size}</span>
        </div>
      </div>

      {/* Actions */}
      <div className={`flex gap-2 border-t px-4 py-3 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        {!isIsolated ? (
          <button
            onClick={onIsolate}
            className={`${btnBase} flex-1 ${
              isDark
                ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
            }`}
          >
            ◎ Isolate
          </button>
        ) : (
          <button
            onClick={onReset}
            className={`${btnBase} flex-1 ${
              isDark
                ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
            }`}
          >
            ⊞ Show All
          </button>
        )}
        <button
          onClick={onReset}
          className={`${btnBase} flex-1 ${
            isDark
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          ↺ Reset
        </button>
      </div>
    </motion.div>
  )
}

// ─── Hover tooltip ───────────────────────────────────────────────
function HoverTooltip({ isDark, partName }: { isDark: boolean; partName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className={`pointer-events-none absolute bottom-16 left-1/2 z-20 -translate-x-1/2 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-lg ${
        isDark
          ? "border-gray-700 bg-gray-800/95 text-blue-300"
          : "border-gray-200 bg-white/95 text-blue-600"
      }`}
    >
      {partName}
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════
interface MRIViewerProps {
  isDark: boolean
}

export default function MRIViewer({ isDark }: MRIViewerProps) {
  const xrStore = createXRStore()

  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [selectedInfo, setSelectedInfo] = useState<PartInfo | null>(null)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)
  const [isolatedPart, setIsolatedPart] = useState<string | null>(null)

  const handleSelectPart = useCallback((name: string, info: PartInfo) => {
    setSelectedPart((prev) => (prev === name ? null : name))
    setSelectedInfo((prev) => (prev?.name === name ? null : info))
    setIsolatedPart(null)
  }, [])

  const handleReset = useCallback(() => {
    setSelectedPart(null)
    setSelectedInfo(null)
    setIsolatedPart(null)
    setHoveredPart(null)
    document.body.style.cursor = "auto"
  }, [])

  const handleIsolate = useCallback(() => {
    if (selectedPart) setIsolatedPart(selectedPart)
  }, [selectedPart])

  return (
    <div className="relative w-full">
      {/* Info overlay with VR button */}
      <div
        className={`absolute left-4 top-4 z-10 flex flex-col gap-2 rounded-lg border px-3 py-2 ${
          isDark
            ? "border-gray-700 bg-gray-800/90 text-gray-300"
            : "border-gray-200 bg-white/90 text-gray-600"
        }`}
      >
        <p className="text-sm font-semibold">MRI 3D Visualization</p>
        <p className="text-xs opacity-80">Click parts to inspect • Hover to highlight</p>
        <XRButton
          store={xrStore}
          mode="immersive-vr"
          style={{
            backgroundColor: isDark ? "#3b82f6" : "#2563eb",
            color: "white",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          Enter VR
        </XRButton>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedPart && selectedInfo && (
          <InfoPanel
            key="info-panel"
            isDark={isDark}
            partInfo={selectedInfo}
            isIsolated={isolatedPart !== null}
            onIsolate={handleIsolate}
            onReset={handleReset}
            onClose={handleReset}
          />
        )}
      </AnimatePresence>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredPart && !selectedPart && (
          <HoverTooltip key="hover-tip" isDark={isDark} partName={hoveredPart} />
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <div className="h-screen w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          onPointerMissed={() => handleReset()}
        >
          <XR store={xrStore}>
            <Suspense fallback={<Loader isDark={isDark} />}>
              <Scene
                isDark={isDark}
                selectedPart={selectedPart}
                hoveredPart={hoveredPart}
                isolatedPart={isolatedPart}
                onSelectPart={handleSelectPart}
                onHoverPart={setHoveredPart}
                onUnhoverPart={() => setHoveredPart(null)}
              />
            </Suspense>
          </XR>
        </Canvas>
      </div>

      {/* Model labels */}
      <div
        className={`absolute bottom-4 left-4 right-4 flex justify-between gap-4 text-xs ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div
          className={`rounded-lg border px-3 py-2 ${
            isDark ? "border-gray-700 bg-gray-800/90" : "border-gray-200 bg-white/90"
          }`}
        >
          <span className="font-semibold">MRI.glb</span>
          <span className="ml-2 opacity-70">Primary 3D Model — Click parts to interact</span>
        </div>
        <div
          className={`rounded-lg border px-3 py-2 ${
            isDark ? "border-gray-700 bg-gray-800/90" : "border-gray-200 bg-white/90"
          }`}
        >
          <span className="font-semibold">MRI.fbx</span>
          <span className="ml-2 opacity-70">Scan Visualization — Click parts to interact</span>
        </div>
      </div>
    </div>
  )
}
