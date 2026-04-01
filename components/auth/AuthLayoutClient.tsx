"use client"

import React from "react"
import { motion } from "framer-motion"
import NeuralNetwork3D from "components/3D/NeuralNetwork3D"
import { useTheme } from "contexts/ThemeContext"

export default function AuthLayoutClient({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme()

  return (
    <div
      className={`relative min-h-screen w-screen overflow-hidden transition-colors ${
        isDark ? "bg-gray-950" : "bg-white"
      }`}
    >
      {/* Background will be handled by individual auth pages */}

      {/* 3D Neural Network */}
      <div className="absolute inset-0 flex items-center justify-center">
        <NeuralNetwork3D />
      </div>

      {/* Auth content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
