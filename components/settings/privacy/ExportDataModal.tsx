"use client"

import { useState } from "react"
import { slideInRight, fadeIn } from "@/components/settings/members/types"

const cortifactColors = {
  bg: {
    dark: "#0D0D0D",
    light: "#FAFAFA",
  },
  sidebar: {
    dark: "#D97757",
    light: "#F5F5F5",
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
}

type DateRange = "All" | "30 days" | "90 days" | "Custom"

interface ExportDataModalProps {
  isOpen: boolean
  isDark: boolean
  onClose: () => void
}

export default function ExportDataModal({ isOpen, isDark, onClose }: ExportDataModalProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>("All")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  if (!isOpen) return null

  const dateRanges: DateRange[] = ["All", "30 days", "90 days", "Custom"]

  return (
    <>
      <style>{slideInRight}</style>
      <style>{fadeIn}</style>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        style={{
          backgroundColor: isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.4)",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <div
          className="w-full max-w-md rounded-lg border p-6 shadow-2xl"
          style={{
            backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light,
            borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
            animation: "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header with Icon */}
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${cortifactColors.accent}20` }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: cortifactColors.accent }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l3 3m0 0l3-3m-3 3V3"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Export data
              </h3>
              <p
                className="text-sm"
                style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
              >
                A download link will be sent to your email
              </p>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Conversations from
            </label>
            <div className="flex flex-wrap gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className="rounded-md border px-3 py-1.5 text-sm transition-colors"
                  style={{
                    backgroundColor:
                      selectedRange === range
                        ? isDark
                          ? cortifactColors.sidebar.light
                          : cortifactColors.text.light
                        : "transparent",
                    color:
                      selectedRange === range
                        ? isDark
                          ? cortifactColors.text.light
                          : cortifactColors.bg.light
                        : isDark
                        ? cortifactColors.text.dark
                        : cortifactColors.text.light,
                    borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                  }}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Custom Date Range */}
            {selectedRange === "Custom" && (
              <div className="mt-3 flex gap-3">
                <div className="flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none"
                    style={{
                      backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.bg.light,
                      borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                      color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none"
                    style={{
                      backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.bg.light,
                      borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                      color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Export Includes */}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Export will include
            </label>
            <div
              className="rounded-lg border"
              style={{ borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light }}
            >
              {/* Conversations */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{
                  borderBottom: `1px solid ${isDark ? cortifactColors.border.dark : cortifactColors.border.light}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span
                    className="text-sm"
                    style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
                  >
                    Conversations
                  </span>
                </div>
                <span
                  className="text-sm"
                  style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                >
                  All
                </span>
              </div>

              {/* Users */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{
                  borderBottom: `1px solid ${isDark ? cortifactColors.border.dark : cortifactColors.border.light}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.592-2.641m-6.24 2.641v-.003c0-1.113.285-2.16.786-3.07m0 0a6.375 6.375 0 0111.592-2.641m-11.592 2.641a6.375 6.375 0 0111.592-2.641m0 0c1.178 0 2.279.29 3.253.801"
                    />
                  </svg>
                  <span
                    className="text-sm"
                    style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
                  >
                    Users
                  </span>
                </div>
                <span
                  className="text-sm"
                  style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                >
                  All
                </span>
              </div>

              {/* Projects */}
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  <span
                    className="text-sm"
                    style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
                  >
                    Projects
                  </span>
                </div>
                <span
                  className="text-sm"
                  style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                >
                  All
                </span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div
            className="mb-6 rounded-md border p-3 text-xs"
            style={{
              backgroundColor: isDark ? `${cortifactColors.accent}10` : `${cortifactColors.accent}08`,
              borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
              color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light,
            }}
          >
            <div className="mb-1 flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: cortifactColors.accent }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p
                className="font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Export details
              </p>
            </div>
            <p>Link expires in 24 hours. You can request a new export anytime.</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm transition-colors hover:opacity-80"
              style={{
                borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
              }}
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1 rounded-md px-4 py-2 text-sm text-white transition-all hover:scale-105 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: cortifactColors.accent }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l3 3m0 0l3-3m-3 3V3"
                />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
