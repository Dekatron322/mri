"use client"

import { Canvas } from "@react-three/fiber"
import { Float, PointMaterial, Points } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

function ParticleField() {
  const points = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(150 * 3)
    const colors = new Float32Array(150 * 3)

    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      colors[i * 3] = Math.random() * 0.5 + 0.5
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5
      colors[i * 3 + 2] = 1
    }

    return { positions, colors }
  }, [])

  return (
    <Points ref={points} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function AnimatedParticles() {
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <ParticleField />
        </Float>
      </Canvas>
    </div>
  )
}
