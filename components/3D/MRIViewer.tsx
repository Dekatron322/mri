"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { XRButton, createXRStore, XR } from "@react-three/xr"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

// GLB Model Component
function MRIGLBModel({ isDark }: { isDark: boolean }) {
  const { scene } = useGLTF("/MRI.glb")
  const modelRef = useRef<THREE.Group>(null)

  // Clone scene to avoid modifying cached original
  const clonedScene = scene.clone()

  // Apply materials based on theme
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = child.material.clone()
      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.emissive = new THREE.Color(isDark ? "#3b82f6" : "#06b6d4")
        child.material.emissiveIntensity = isDark ? 0.2 : 0.1
        child.material.metalness = 0.8
        child.material.roughness = 0.2
      }
    }
  })

  return (
    <group ref={modelRef} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} scale={2}>
      <primitive object={clonedScene} />
    </group>
  )
}

// FBX-style Model Component - scan visualization
function MRIFBXModel({ isDark }: { isDark: boolean }) {
  return (
    <group position={[3, 0, -2]} rotation={[0, -Math.PI / 3, 0]}>
      {/* Outer wireframe box */}
      <mesh>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial
          color={isDark ? "#1f2937" : "#f3f4f6"}
          emissive={isDark ? "#8b5cf6" : "#ec4899"}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
          wireframe
        />
      </mesh>
      {/* Inner sphere - brain representation */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? "#111827" : "#ffffff"}
          emissive={isDark ? "#10b981" : "#059669"}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Scanning planes */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, -0.8 + i * 0.4, 0]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial
            color={isDark ? "#3b82f6" : "#60a5fa"}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// Scene with both models
function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color={isDark ? "#3b82f6" : "#60a5fa"} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={isDark ? "#8b5cf6" : "#a78bfa"} />
      <spotLight position={[0, 10, 0]} intensity={0.3} color={isDark ? "#06b6d4" : "#22d3ee"} />

      {/* Environment */}
      <Environment preset={isDark ? "night" : "city"} />

      {/* Models */}
      <MRIGLBModel isDark={isDark} />
      <MRIFBXModel isDark={isDark} />

      {/* Grid helper */}
      <gridHelper
        args={[20, 20, isDark ? "#374151" : "#d1d5db", isDark ? "#1f2937" : "#e5e7eb"]}
        position={[0, -2, 0]}
      />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={15}
      />
    </>
  )
}

// Loading fallback
function Loader({ isDark }: { isDark: boolean }) {
  return (
    <Html center>
      <div className={`flex flex-col items-center gap-3 ${isDark ? "text-white" : "text-gray-900"}`}>
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

// Main component
interface MRIViewerProps {
  isDark: boolean
}

export default function MRIViewer({ isDark }: MRIViewerProps) {
  const xrStore = createXRStore()

  return (
    <div className="relative w-full">
      {/* Info overlay with VR button */}
      <div
        className={`absolute left-4 top-4 z-10 flex flex-col gap-2 rounded-lg border px-3 py-2 ${
          isDark ? "border-gray-700 bg-gray-800/90 text-gray-300" : "border-gray-200 bg-white/90 text-gray-600"
        }`}
      >
        <p className="text-sm font-semibold">MRI 3D Visualization</p>
        <p className="text-xs opacity-80">Drag to rotate • Scroll to zoom</p>
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

      {/* 3D Canvas */}
      <div className="h-screen w-full">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <XR store={xrStore}>
            <Suspense fallback={<Loader isDark={isDark} />}>
              <Scene isDark={isDark} />
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
          <span className="ml-2 opacity-70">Primary 3D Model</span>
        </div>
        <div
          className={`rounded-lg border px-3 py-2 ${
            isDark ? "border-gray-700 bg-gray-800/90" : "border-gray-200 bg-white/90"
          }`}
        >
          <span className="font-semibold">MRI.fbx</span>
          <span className="ml-2 opacity-70">Scan Visualization</span>
        </div>
      </div>
    </div>
  )
}
