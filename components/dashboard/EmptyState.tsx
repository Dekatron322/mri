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

const suggestedPrompts = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Analyze data",
    description: "Upload a file and I'll help you understand it",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Brainstorm ideas",
    description: "Let's think through a problem together",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "Write code",
    description: "Help with programming and debugging",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Summarize text",
    description: "Get the key points from any document",
  },
]

interface EmptyStateProps {
  onPromptClick: () => void
}

export default function EmptyState({ onPromptClick }: EmptyStateProps) {
  const { isDark } = useTheme()

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      {/* Logo/Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${cortifactColors.accent}20` }}
        >
          <svg
            className="h-8 w-8"
            style={{ color: cortifactColors.accent }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Welcome Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-2 text-center text-3xl font-medium"
        style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
      >
        Good afternoon
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-8 text-center text-lg"
        style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
      >
        How can I help you today?
      </motion.p>

      {/* Suggested Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid w-full max-w-2xl grid-cols-2 gap-3"
      >
        {suggestedPrompts.map((prompt, index) => (
          <motion.button
            key={prompt.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
            onClick={onPromptClick}
            className="flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:scale-[1.02]"
            style={{
              borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
              backgroundColor: isDark ? cortifactColors.input.dark : cortifactColors.input.light,
              color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${cortifactColors.accent}15`, color: cortifactColors.accent }}
            >
              {prompt.icon}
            </div>
            <div>
              <h3
                className="mb-1 font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                {prompt.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
              >
                {prompt.description}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center text-sm"
        style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
      >
        Cortifact can make mistakes. Please double-check responses.
      </motion.p>
    </div>
  )
}
