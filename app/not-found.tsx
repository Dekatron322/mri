"use client"

import { motion, Variants } from "framer-motion"
import { useRouter } from "next/navigation"
import { useSound } from "utils/sounds"
import { useTheme } from "contexts/ThemeContext"

// Theme toggle button
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
        // Moon icon
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor" />
      ) : (
        // Sun icon
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

// Grid icon
const GridIcon = ({ isDark }: { isDark: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={isDark ? "text-gray-600" : "text-gray-300"}
  >
    <path d="M4 4H8V8H4V4Z" fill="currentColor" />
    <path d="M10 4H14V8H10V4Z" fill="currentColor" />
    <path d="M16 4H20V8H16V4Z" fill="currentColor" />
    <path d="M4 10H8V14H4V10Z" fill="currentColor" />
    <path d="M10 10H14V14H10V10Z" fill="currentColor" />
    <path d="M16 10H20V14H16V10Z" fill="currentColor" />
    <path d="M4 16H8V20H4V16Z" fill="currentColor" />
    <path d="M10 16H14V20H10V16Z" fill="currentColor" />
    <path d="M16 16H20V20H16V16Z" fill="currentColor" />
  </svg>
)

// Colorful neural thread
const ColorfulThreadLine = ({ delay, top, color }: { delay: number; top: string; color: string }) => (
  <motion.div
    className="absolute h-px"
    style={{
      width: "80%",
      left: "10%",
      top,
      background: `linear-gradient(90deg, transparent 0%, ${color} 20%, ${color} 80%, transparent 100%)`,
      boxShadow: `0 0 8px ${color}`,
    }}
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 1] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
)

// Colored circuit node
const ColoredCircuitNode = ({
  top,
  left,
  delay,
  color,
}: {
  top: string
  left: string
  delay: number
  color: string
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      top,
      left,
      width: "6px",
      height: "6px",
      backgroundColor: color,
      boxShadow: `0 0 10px ${color}`,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 2, 1], opacity: [0, 1, 0.8] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
  />
)

// Color pulse wave
const ColorWave = ({ delay, top, color }: { delay: number; top: string; color: string }) => (
  <motion.div
    className="absolute h-20 blur-xl"
    style={{
      width: "100%",
      left: 0,
      top,
      background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)`,
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.3, 0] }}
    transition={{ duration: 5, delay, repeat: Infinity }}
  />
)

// Glitch text effect component for the 404
const GlitchText = ({ children }: { children: string }) => (
  <motion.span
    className="relative inline-block"
    animate={{
      x: [-2, 2, -2, 2, 0],
      y: [1, -1, 1, -1, 0],
      skewX: [0, 5, -5, 0],
    }}
    transition={{
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  >
    <span className="absolute left-0 top-0 text-blue-500 opacity-50" style={{ clipPath: "inset(0 0 0 0)" }}>
      {children}
    </span>
    <span
      className="absolute left-0 top-0 text-purple-500 opacity-50"
      style={{ clipPath: "inset(0 0 0 0)", transform: "translate(2px, -1px)" }}
    >
      {children}
    </span>
    {children}
  </motion.span>
)

export default function NotFound() {
  const router = useRouter()
  const { isDark, toggleTheme } = useTheme()
  const { playClick, playHover } = useSound()

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  // Color palette
  const colors = {
    blue: "#3b82f6",
    cyan: "#06b6d4",
    purple: "#8b5cf6",
    pink: "#ec4899",
    amber: "#f59e0b",
    emerald: "#10b981",
  }

  return (
    <main
      className={`relative h-screen w-screen overflow-hidden transition-colors ${isDark ? "bg-gray-950" : "bg-white"}`}
    >
      {/* Background pattern — large grid with colorful overlays */}
      <div className="absolute inset-0">
        {/* Primary large grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${
              isDark ? "#374151" : "#d4d4d4"
            } 1px, transparent 1px), linear-gradient(to bottom, ${
              isDark ? "#374151" : "#d4d4d4"
            } 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: isDark ? 0.3 : 0.6,
          }}
        />

        {/* Secondary diagonal grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, ${isDark ? "#4b5563" : "#c0c0c0"} 0.5px, transparent 0.5px)`,
            backgroundSize: "84px 84px",
            opacity: isDark ? 0.15 : 0.25,
          }}
        />

        {/* Color waves */}
        <ColorWave delay={0} top="20%" color={colors.blue} />
        <ColorWave delay={2} top="40%" color={colors.purple} />
        <ColorWave delay={1} top="60%" color={colors.emerald} />
        <ColorWave delay={3} top="80%" color={colors.amber} />

        {/* Floating geometric elements */}
        <motion.div
          className="absolute right-20 top-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <GridIcon isDark={isDark} />
        </motion.div>

        <motion.div
          className={`absolute bottom-20 left-20 ${isDark ? "text-gray-600" : "text-gray-300"}`}
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        >
          <div className={`h-24 w-24 rounded-sm border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
        </motion.div>

        <motion.div
          className="absolute left-40 top-40"
          animate={{ rotate: 180, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <div className={`h-16 w-16 rounded-full border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
        </motion.div>

        {/* Colorful animated neural threads */}
        <div className="absolute inset-0 overflow-hidden">
          <ColorfulThreadLine delay={0} top="15%" color={colors.blue} />
          <ColorfulThreadLine delay={1.5} top="30%" color={colors.purple} />
          <ColorfulThreadLine delay={0.8} top="45%" color={colors.pink} />
          <ColorfulThreadLine delay={2.2} top="60%" color={colors.cyan} />
          <ColorfulThreadLine delay={0.3} top="75%" color={colors.emerald} />
          <ColorfulThreadLine delay={1.8} top="90%" color={colors.amber} />
        </div>

        {/* Colored circuit nodes */}
        <ColoredCircuitNode top="25%" left="15%" delay={0} color={colors.blue} />
        <ColoredCircuitNode top="35%" left="85%" delay={1.2} color={colors.purple} />
        <ColoredCircuitNode top="70%" left="25%" delay={2.4} color={colors.pink} />
        <ColoredCircuitNode top="80%" left="75%" delay={0.6} color={colors.cyan} />
        <ColoredCircuitNode top="45%" left="45%" delay={1.8} color={colors.emerald} />
        <ColoredCircuitNode top="15%" left="65%" delay={3.0} color={colors.amber} />
        <ColoredCircuitNode top="55%" left="95%" delay={2.1} color={colors.blue} />
        <ColoredCircuitNode top="85%" left="5%" delay={0.9} color={colors.purple} />

        {/* Additional faint connection lines with color tint */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, ${colors.blue}40 0.5px, transparent 0.5px)`,
            backgroundSize: "60px 60px",
            opacity: 0.2,
          }}
        />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} toggle={toggleTheme} />

      {/* Main content */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4">
        <motion.div className="max-w-3xl text-center" variants={stagger} initial="hidden" animate="visible">
          {/* Brand signature */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex justify-center">
              <img src={isDark ? "/logodark.png" : "/mainlogo.png"} alt="Corticalfactory" className="h-14 w-auto" />
            </div>
          </motion.div>

          {/* 404 Display - RESTYLED SECTION */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="relative flex items-center justify-center gap-4">
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-7xl font-black text-transparent">
                  <GlitchText>4</GlitchText>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  borderRadius: ["30%", "50%", "30%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-50 blur-xl" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-6xl font-black text-transparent">
                    0
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  rotateY: [360, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-7xl font-black text-transparent">
                  <GlitchText>4</GlitchText>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.h1
            variants={fadeUp}
            className={`text-5xl font-light sm:text-6xl ${isDark ? "text-gray-100" : "text-gray-900"}`}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mx-auto mt-6 max-w-xl text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Oops! The page you're looking for seems to have vanished into the digital void.
            <br />
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Don't worry, even the best AI agents get lost sometimes.
            </span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick()
                router.push("/")
              }}
              className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium shadow-sm transition-all ${
                isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Go Home
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M8 1L15 8L8 15M15 8H1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playClick()
                router.back()
              }}
              className={`inline-flex h-12 items-center justify-center rounded-full border px-8 py-3 text-sm font-medium transition-colors ${
                isDark
                  ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Go Back
            </motion.button>
          </motion.div>

          {/* Help Section */}
          <motion.div variants={fadeUp} className="mt-8">
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Looking for something specific?{" "}
              <a
                href="/signup"
                className={`font-medium transition-colors ${
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
                }`}
                onClick={playClick}
              >
                Sign up
              </a>{" "}
              or{" "}
              <a
                href="/signin"
                className={`font-medium transition-colors ${
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
                }`}
                onClick={playClick}
              >
                sign in
              </a>{" "}
              to get started.
            </p>
          </motion.div>

          {/* Status indicator */}
          <motion.div
            variants={fadeUp}
            className={`mt-16 flex items-center justify-center gap-2 text-sm ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span>Neural pathways recalibrating...</span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
