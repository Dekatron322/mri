"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"

const cortifactColors = {
  bg: {
    dark: "#0D0D0D",
    light: "#FAFAFA",
  },
  accent: "#D97757",
  text: {
    dark: "#E5E5E5",
    light: "#D97757",
    muted: {
      dark: "#6B6B6B",
      light: "#737373",
    },
  },
  border: {
    dark: "#2A2A2A",
    light: "#E5E5E5",
  },
  input: {
    dark: "#D97757",
    light: "#FFFFFF",
  },
}

export default function ChatInput() {
  const { isDark } = useTheme()
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      // Handle send
      setInputValue("")
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl border transition-all duration-200 ${
          isFocused ? "border-orange-500 shadow-lg shadow-orange-500/10" : ""
        }`}
        style={{
          borderColor: isFocused
            ? cortifactColors.accent
            : isDark
            ? cortifactColors.border.dark
            : cortifactColors.border.light,
          backgroundColor: isDark ? cortifactColors.input.dark : cortifactColors.input.light,
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Message Cortifact..."
            rows={1}
            className="min-h-[56px] w-full resize-none bg-transparent px-4 py-4 text-base outline-none"
            style={{
              color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
            }}
          />

          <div className="flex items-center justify-between px-2 pb-2">
            {/* Left Actions */}
            <div className="flex items-center gap-1">
              {/* Attach File */}
              <button
                type="button"
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                style={{
                  color: inputValue.trim()
                    ? "#fff"
                    : isDark
                    ? cortifactColors.text.muted.dark
                    : cortifactColors.text.muted.light,
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              {/* Voice Input */}
              <button
                type="button"
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                style={{
                  color: inputValue.trim()
                    ? "#fff"
                    : isDark
                    ? cortifactColors.text.muted.dark
                    : cortifactColors.text.muted.light,
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Character Count / Info */}
              <span
                className="text-xs"
                style={{
                  color: inputValue.trim()
                    ? "#fff"
                    : isDark
                    ? cortifactColors.text.muted.dark
                    : cortifactColors.text.muted.light,
                }}
              >
                {inputValue.length > 0 && `${inputValue.length} characters`}
              </span>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-all disabled:opacity-30"
                style={{
                  backgroundColor: inputValue.trim() ? cortifactColors.accent : isDark ? "#333" : "#e5e5e5",
                  color: inputValue.trim()
                    ? "#fff"
                    : isDark
                    ? cortifactColors.text.muted.dark
                    : cortifactColors.text.muted.light,
                }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Model Info */}
      <div className="mt-2 flex items-center justify-center gap-4 text-xs">
        <span
          style={{
            color: inputValue.trim()
              ? "#fff"
              : isDark
              ? cortifactColors.text.muted.dark
              : cortifactColors.text.muted.light,
          }}
        >
          Cortifact PM 1.0
        </span>
        <span
          style={{
            color: inputValue.trim()
              ? "#fff"
              : isDark
              ? cortifactColors.text.muted.dark
              : cortifactColors.text.muted.light,
          }}
        >
          •
        </span>
        <button
          className="transition-colors hover:underline"
          style={{
            color: inputValue.trim()
              ? "#fff"
              : isDark
              ? cortifactColors.text.muted.dark
              : cortifactColors.text.muted.light,
          }}
        >
          Privacy
        </button>
      </div>
    </div>
  )
}
