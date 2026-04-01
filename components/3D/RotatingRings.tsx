"use client"

import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

function RotatingRing({ position, color, speed, scale }: { 
  position: [number, number, number]
  color: string
  speed: number
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed
      meshRef.current.rotation.y += delta * speed * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

export default function RotatingRings() {
  const rings = [
    { position: [-4, 3, 0] as [number, number, number], color: "#3b82f6", speed: 0.5, scale: 0.5 },
    { position: [4, -3, 2] as [number, number, number], color: "#8b5cf6", speed: -0.3, scale: 0.7 },
    { position: [-3, -2, -2] as [number, number, number], color: "#06b6d4", speed: 0.4, scale: 0.6 },
    { position: [3, 2, -1] as [number, number, number], color: "#10b981", speed: -0.6, scale: 0.4 },
  ]

  return (
    <div className="absolute inset-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        
        {rings.map((ring, index) => (
          <Float key={index} speed={0.8} rotationIntensity={0.1} floatIntensity={0.1}>
            <RotatingRing 
              position={ring.position} 
              color={ring.color} 
              speed={ring.speed} 
              scale={ring.scale}
            />
          </Float>
        ))}
      </Canvas>
    </div>
  )
}
