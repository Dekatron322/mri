"use client"

import { useState } from "react"
import { cortifactColors, slideInRight, fadeIn } from "./types"

interface InviteLinkModalProps {
  isOpen: boolean
  isDark: boolean
  onClose: () => void
}

export default function InviteLinkModal({ isOpen, isDark, onClose }: InviteLinkModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    const inviteLink = `https://cortifact.ai/invite/${Math.random().toString(36).substring(2, 15)}`
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Invite link
              </h3>
              <p
                className="text-sm"
                style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
              >
                Share this link to invite people directly
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-2">
              <div
                className="flex flex-1 items-center gap-2 truncate rounded-md border px-3 py-2"
                style={{
                  backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                  borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                }}
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <code
                  className="truncate text-sm"
                  style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
                >
                  https://cortifact.ai/invite/org_abc123
                </code>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-md px-4 py-2 text-sm text-white transition-all hover:scale-105 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: cortifactColors.accent }}
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div
            className="mb-6 rounded-md border p-3 text-xs"
            style={{
              backgroundColor: isDark ? `${cortifactColors.accent}10` : `${cortifactColors.accent}08`,
              borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
              color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
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
                Link settings
              </p>
            </div>
            <p>Anyone with this link can join as a Member. Link expires in 7 days.</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm transition-colors hover:opacity-80"
              style={{
                borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
