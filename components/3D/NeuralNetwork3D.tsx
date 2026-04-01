"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Line } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

// Neural network node component
function NeuralNode({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

// Connection line between nodes
function Connection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  return (
    <Line points={[new THREE.Vector3(...start), new THREE.Vector3(...end)]} color="#06b6d4" opacity={0.6} transparent />
  )
}

// Floating geometric shapes
function FloatingShape({
  position,
  geometry,
  color,
}: {
  position: [number, number, number]
  geometry: string
  color: string
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh position={position} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
        {geometry === "box" && <boxGeometry args={[0.2, 0.2, 0.2]} />}
        {geometry === "torus" && <torusGeometry args={[0.15, 0.05, 16, 32]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[0.15]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
          wireframe
        />
      </mesh>
    </Float>
  )
}

// Main 3D scene
export default function NeuralNetwork3D() {
  // Define neural network nodes positions

  // Floating shapes
  const shapes = [
    { position: [-3, 2, 2] as [number, number, number], geometry: "box", color: "#8b5cf6" },
    { position: [3, -2, 2] as [number, number, number], geometry: "torus", color: "#ec4899" },
    { position: [-3, -2, -2] as [number, number, number], geometry: "octahedron", color: "#f59e0b" },
    { position: [3, 2, -2] as [number, number, number], geometry: "box", color: "#10b981" },
  ]

  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ background: "transparent" }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight position={[0, 5, 0]} intensity={0.3} color="#06b6d4" />

        {/* Floating geometric shapes */}
        {shapes.map((shape, index) => (
          <FloatingShape key={index} position={shape.position} geometry={shape.geometry} color={shape.color} />
        ))}

        {/* Subtle auto-rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.2}
        />
      </Canvas>
    </div>
  )
}
