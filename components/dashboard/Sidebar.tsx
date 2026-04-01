"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { useState } from "react"

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

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const recentChats = [
  { id: 1, title: "API Integration Help", date: "2 hours ago" },
  { id: 2, title: "Dashboard Design Review", date: "Yesterday" },
  { id: 3, title: "Database Schema Discussion", date: "2 days ago" },
  { id: 4, title: "Authentication Flow", date: "3 days ago" },
  { id: 5, title: "Deployment Strategy", date: "1 week ago" },
]

const projects = [
  { id: 1, name: "Work", color: "#D97757" },
  { id: 2, name: "Personal", color: "#6B6B6B" },
]

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { isDark } = useTheme()
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </motion.button>
    )
  }

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex w-[280px] flex-col border-r"
      style={{
        borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
        backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onToggle}
          className="rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* New Chat Button */}
        <button
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          style={{
            backgroundColor: isDark ? cortifactColors.bg.dark : "#fff",
            color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
            border: `1px solid ${isDark ? cortifactColors.border.dark : cortifactColors.border.light}`,
          }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New chat
        </button>
      </div>

      {/* Projects */}
      <div className="px-4 pb-2">
        <h3
          className="mb-2 text-xs font-medium uppercase tracking-wide"
          style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
        >
          Projects
        </h3>
        <div className="space-y-1">
          {projects.map((project) => (
            <button
              key={project.id}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: project.color }} />
              {project.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <h3
          className="mb-2 text-xs font-medium uppercase tracking-wide"
          style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
        >
          Recent
        </h3>
        <div className="space-y-1">
          {recentChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex w-full flex-col gap-0.5 rounded-lg px-2 py-2 text-left text-sm transition-colors ${
                activeChat === chat.id ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span
                className="truncate font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                {chat.title}
              </span>
              <span
                className="text-xs"
                style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
              >
                {chat.date}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative border-t p-4"
        style={{ borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${cortifactColors.accent} 0%, #8B4513 100%)`,
            }}
          >
            <div className="flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white/90" />
              <div className="mx-0.5 h-3 w-1 rounded-full bg-white/60" />
              <div className="h-2 w-2 rounded-full bg-white/90" />
            </div>
          </button>
          <div className="flex-1">
            <p
              className="text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              User
            </p>
            <p
              className="text-xs"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              Free Plan
            </p>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* User Menu Dropdown */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-2 right-2 z-50 mb-2 overflow-hidden rounded-xl border shadow-xl"
              style={{
                borderColor: isDark ? "#444" : cortifactColors.border.light,
                backgroundColor: isDark ? "#30302E" : "#fff",
              }}
            >
              {/* Email Header */}
              <div className="px-4 py-3">
                <p className="text-sm" style={{ color: isDark ? "#9a9a9a" : "#666" }}>
                  user@example.com
                </p>
              </div>

              {/* Menu Items */}
              <div className="px-2 pb-2">
                {/* Settings */}
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </div>
                  <span className="text-xs opacity-50">⌘,</span>
                </button>

                {/* Language */}
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Language
                  </div>
                  <svg
                    className="h-4 w-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Get help */}
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <svg
                    className="h-[18px] w-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Get help
                </button>

                {/* Divider */}
                <div className="my-1 border-t opacity-30" style={{ borderColor: isDark ? "#555" : "#ddd" }} />

                {/* Upgrade plan */}
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <svg
                    className="h-[18px] w-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Upgrade plan
                </button>

                {/* Get apps and extensions */}
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <svg
                    className="h-[18px] w-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Get apps and extensions
                </button>

                {/* Gift Cortifact */}
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <svg
                    className="h-[18px] w-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  Gift Cortifact
                </button>

                {/* Learn more */}
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Learn more
                  </div>
                  <svg
                    className="h-4 w-4 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Divider */}
                <div className="my-1 border-t opacity-30" style={{ borderColor: isDark ? "#555" : "#ddd" }} />

                {/* Log out */}
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/10"
                  style={{ color: isDark ? "#e8e8e8" : "#1a1a1a" }}
                >
                  <svg
                    className="h-[18px] w-[18px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.aside>
  )
}
