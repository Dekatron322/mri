"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamic import for MRI Viewer to avoid SSR issues with Three.js
const MRIViewer = dynamic(() => import("@/components/3D/MRIViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  ),
})

// ─── Dark theme hook ─────────────────────────────────────────────
const useDarkTheme = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark"
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return { isDark, toggleTheme }
}

// ─── Theme toggle ────────────────────────────────────────────────
const ThemeToggle = ({ isDark, toggle }: { isDark: boolean; toggle: () => void }) => (
  <motion.button
    onClick={toggle}
    className="fixed right-6 top-6 z-30 rounded-full border border-gray-200 bg-white p-3 text-gray-800 shadow-lg transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      animate={{ rotate: isDark ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? (
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor" />
      ) : (
        <>
          <circle cx="10" cy="10" r="4" fill="currentColor" />
          <path
            d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </motion.svg>
  </motion.button>
)

// ═════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════
export default function CortifactLanding() {
  const { isDark, toggleTheme } = useDarkTheme()

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden transition-colors ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* ── MRI 3D VIEWER FULL SCREEN BACKGROUND ─────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-0 h-screen w-screen"
      >
        <div className={`h-full w-full ${isDark ? "bg-gray-900" : "bg-white"}`}>
          <MRIViewer isDark={isDark} />
        </div>
      </motion.div>

      {/* ── CONTENT OVERLAY ───────────────────────────────── */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-7xl px-5">
        {/* ── SECTION 1: HERO ───────────────────────────────────── */}
        <div className="flex min-h-screen flex-col items-center justify-center pb-20 pt-10 text-center"></div>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />
    </main>
  )
}
