"use client"

import { useTheme } from "@/contexts/ThemeContext"

const cortifactColors = {
  bg: {
    dark: "#0D0D0D",
    light: "#FAFAFA",
  },
  sidebar: {
    dark: "#1A1A1A",
    light: "#F5F5F5",
  },
  accent: "#D97757",
  text: {
    dark: "#E5E5E5",
    light: "#1A1A1A",
    muted: {
      dark: "#6B6B6B",
      light: "#737373",
    },
  },
  border: {
    dark: "#2A2A2A",
    light: "#E5E5E5",
  },
}

interface DashboardHeaderProps {
  sidebarOpen: boolean
  onOpenSidebar: () => void
}

export default function DashboardHeader({ sidebarOpen, onOpenSidebar }: DashboardHeaderProps) {
  const { isDark } = useTheme()

  return (
    <header
      className="flex items-center justify-between border-b px-4 py-3"
      style={{
        borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
        backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light,
      }}
    >
      <div className="flex items-center gap-3">
        {sidebarOpen ? (
          <img
            src={isDark ? "/cortifact-dark.png" : "/cortifact-light.png"}
            alt="Cortifact"
            className="h-6 object-contain"
          />
        ) : (
          <>
            {!sidebarOpen && (
              <button
                onClick={onOpenSidebar}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <img
              src={isDark ? "/cortifact-dark.png" : "/cortifact-light.png"}
              alt="Cortifact"
              className="h-6 object-contain"
            />
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors"
          style={{
            borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
            color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
          }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cortifactColors.accent }} />
          <span>Cortifact PM 1.0</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{
            background: `linear-gradient(135deg, ${cortifactColors.accent} 0%, #8B4513 100%)`,
          }}
        >
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white/90" />
            <div className="mx-0.5 h-3 w-1 rounded-full bg-white/60" />
            <div className="h-2 w-2 rounded-full bg-white/90" />
          </div>
        </div>
      </div>
    </header>
  )
}
