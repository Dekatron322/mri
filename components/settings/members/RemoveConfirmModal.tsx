"use client"

import { cortifactColors, type Member } from "./types"

interface RemoveConfirmModalProps {
  isOpen: boolean
  isDark: boolean
  member: Member | null
  onClose: () => void
  onConfirm: () => void
}

export default function RemoveConfirmModal({ isOpen, isDark, member, onClose, onConfirm }: RemoveConfirmModalProps) {
  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-sm rounded-lg p-6 text-center"
        style={{ backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: `${cortifactColors.danger}20` }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: cortifactColors.danger }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3
          className="mb-2 text-lg font-medium"
          style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
        >
          Remove member?
        </h3>
        <p
          className="mb-6 text-sm"
          style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
        >
          Are you sure you want to remove <strong>{member.name}</strong> from your organization? This action
          cannot be undone.
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm transition-colors"
            style={{
              borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
              color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md px-4 py-2 text-sm text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: cortifactColors.danger }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
