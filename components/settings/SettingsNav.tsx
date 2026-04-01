"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { useRouter } from "next/navigation"

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

const navItems = [
  { name: "General", href: "/settings/general" },
  { name: "Account", href: "/settings/account" },
  { name: "Members", href: "/settings/members" },
  { name: "Privacy", href: "/settings/privacy" },
  { name: "Billing", href: "/settings/billing" },
  { name: "Persona", href: "/settings/persona" },
  { name: "Workspaces", href: "/settings/workspaces" },
]

interface SettingsNavProps {
  activeItem: string
}

export default function SettingsNav({ activeItem }: SettingsNavProps) {
  const { isDark } = useTheme()
  const router = useRouter()

  return (
    <aside
      className="w-48 shrink-0 py-6 pr-4"
      style={{
        borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
        backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light,
      }}
    >
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className="rounded-md px-4 py-2 text-left text-sm transition-colors"
            style={{
              backgroundColor:
                activeItem === item.name
                  ? isDark
                    ? cortifactColors.sidebar.dark
                    : cortifactColors.sidebar.light
                  : "transparent",
              color:
                activeItem === item.name
                  ? cortifactColors.accent
                  : isDark
                  ? cortifactColors.text.dark
                  : cortifactColors.text.light,
            }}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}
