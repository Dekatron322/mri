"use client"

import { useState } from "react"
import { cortifactColors, slideInRight, fadeIn, toneOptions, type PersonaConfig } from "./types"

interface AddPersonaModalProps {
  isOpen: boolean
  isDark: boolean
  onClose: () => void
  onAdd: (persona: Omit<PersonaConfig, "id" | "updatedAt">) => void
}

export default function AddPersonaModal({ isOpen, isDark, onClose, onAdd }: AddPersonaModalProps) {
  const [personaName, setPersonaName] = useState("")
  const [tone, setTone] = useState(0)
  const [principles, setPrinciples] = useState<string[]>([])
  const [boundaries, setBoundaries] = useState<string[]>([])
  const [updatedBy, setUpdatedBy] = useState("")
  const [newPrinciple, setNewPrinciple] = useState("")
  const [newBoundary, setNewBoundary] = useState("")
  const [status, setStatus] = useState<"Active" | "Draft">("Draft")

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!personaName.trim() || !updatedBy.trim()) return

    onAdd({
      personaName: personaName.trim(),
      tone,
      principles,
      boundaries,
      updatedBy: updatedBy.trim(),
      status,
    })

    // Reset form
    setPersonaName("")
    setTone(0)
    setPrinciples([])
    setBoundaries([])
    setUpdatedBy("")
    setNewPrinciple("")
    setNewBoundary("")
    setStatus("Draft")
    onClose()
  }

  const handleAddPrinciple = () => {
    if (newPrinciple.trim() && !principles.includes(newPrinciple.trim())) {
      setPrinciples([...principles, newPrinciple.trim()])
      setNewPrinciple("")
    }
  }

  const handleRemovePrinciple = (index: number) => {
    setPrinciples(principles.filter((_, i) => i !== index))
  }

  const handleAddBoundary = () => {
    if (newBoundary.trim() && !boundaries.includes(newBoundary.trim())) {
      setBoundaries([...boundaries, newBoundary.trim()])
      setNewBoundary("")
    }
  }

  const handleRemoveBoundary = (index: number) => {
    setBoundaries(boundaries.filter((_, i) => i !== index))
  }

  const selectedTone = toneOptions.find((t) => t.value === tone) || toneOptions[0]!

  return (
    <>
      <style>{slideInRight}</style>
      <style>{fadeIn}</style>

      {/* Backdrop */}
      <div
        className="animate-fade-in fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      />

      {/* Sidebar Modal */}
      <div
        className="animate-slide-in-right fixed bottom-0 right-0 top-0 z-50 w-[500px] overflow-y-auto"
        style={{
          backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light,
          borderLeft: `1px solid ${isDark ? cortifactColors.border.dark : cortifactColors.border.light}`,
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4"
          style={{
            backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light,
            borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
          }}
        >
          <div>
            <h2
              className="text-lg font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Create Persona
            </h2>
            <p
              className="text-xs"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              Configure a new voice and personality for your agents
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:opacity-70"
            style={{
              backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
              color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="space-y-6 p-6">
          {/* Persona Name */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Persona Name <span style={{ color: cortifactColors.accent }}>*</span>
            </label>
            <input
              type="text"
              value={personaName}
              onChange={(e) => setPersonaName(e.target.value)}
              placeholder="e.g., Cortifact Assistant"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:border-transparent"
              style={{
                borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
              }}
            />
            <p
              className="mt-1 text-xs"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              The public name your agents will use when interacting with users.
            </p>
          </div>

          {/* Status */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Status
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setStatus("Draft")}
                className="flex flex-1 items-center gap-2 rounded-lg border-2 p-3 text-left transition-all"
                style={{
                  borderColor:
                    status === "Draft"
                      ? cortifactColors.accent
                      : isDark
                      ? cortifactColors.border.dark
                      : cortifactColors.border.light,
                  backgroundColor: status === "Draft" ? (isDark ? "#3D261E" : "#FDF8F6") : "transparent",
                }}
              >
                <div
                  className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor:
                      status === "Draft"
                        ? cortifactColors.accent
                        : isDark
                        ? cortifactColors.text.muted.dark
                        : cortifactColors.text.muted.light,
                    backgroundColor: status === "Draft" ? cortifactColors.accent : "transparent",
                  }}
                >
                  {status === "Draft" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      status === "Draft"
                        ? cortifactColors.accent
                        : isDark
                        ? cortifactColors.text.dark
                        : cortifactColors.text.light,
                  }}
                >
                  Draft
                </span>
              </button>
              <button
                onClick={() => setStatus("Active")}
                className="flex flex-1 items-center gap-2 rounded-lg border-2 p-3 text-left transition-all"
                style={{
                  borderColor:
                    status === "Active"
                      ? cortifactColors.accent
                      : isDark
                      ? cortifactColors.border.dark
                      : cortifactColors.border.light,
                  backgroundColor: status === "Active" ? (isDark ? "#1E3D1E" : "#F0FDF4") : "transparent",
                }}
              >
                <div
                  className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor:
                      status === "Active"
                        ? "#22C55E"
                        : isDark
                        ? cortifactColors.text.muted.dark
                        : cortifactColors.text.muted.light,
                    backgroundColor: status === "Active" ? "#22C55E" : "transparent",
                  }}
                >
                  {status === "Active" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      status === "Active" ? "#22C55E" : isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                  }}
                >
                  Active
                </span>
              </button>
            </div>
          </div>

          {/* Tone Selection */}
          <div>
            <label
              className="mb-3 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Tone & Personality
            </label>
            <div className="grid grid-cols-1 gap-2">
              {toneOptions.map((toneOption) => (
                <button
                  key={toneOption.value}
                  onClick={() => setTone(toneOption.value)}
                  className="flex items-center gap-3 rounded-lg border p-3 text-left transition-all"
                  style={{
                    borderColor:
                      tone === toneOption.value
                        ? cortifactColors.accent
                        : isDark
                        ? cortifactColors.border.dark
                        : cortifactColors.border.light,
                    backgroundColor: tone === toneOption.value ? (isDark ? "#3D261E" : "#FDF8F6") : "transparent",
                  }}
                >
                  <div
                    className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor:
                        tone === toneOption.value
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.text.muted.dark
                          : cortifactColors.text.muted.light,
                      backgroundColor: tone === toneOption.value ? cortifactColors.accent : "transparent",
                    }}
                  >
                    {tone === toneOption.value && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          tone === toneOption.value
                            ? cortifactColors.accent
                            : isDark
                            ? cortifactColors.text.dark
                            : cortifactColors.text.light,
                      }}
                    >
                      {toneOption.label}
                    </span>
                    <p
                      className="text-xs"
                      style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
                    >
                      {toneOption.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Principles */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Principles
            </label>
            <p
              className="mb-3 text-xs"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              Core values that shape how your persona behaves
            </p>

            <div className="mb-3 flex flex-wrap gap-2">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"
                  style={{
                    backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                    color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                  }}
                >
                  <span>{principle}</span>
                  <button
                    onClick={() => handleRemovePrinciple(index)}
                    className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-xs hover:opacity-70"
                    style={{ color: cortifactColors.accent }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newPrinciple}
                onChange={(e) => setNewPrinciple(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPrinciple()}
                placeholder="Add a principle..."
                className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                  backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                  color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                }}
              />
              <button
                onClick={handleAddPrinciple}
                className="rounded-md px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: cortifactColors.accent,
                  color: "#FFFFFF",
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* Boundaries */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Boundaries
            </label>
            <p
              className="mb-3 text-xs"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              Limits and restrictions for your persona
            </p>

            <div className="mb-3 flex flex-wrap gap-2">
              {boundaries.map((boundary, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"
                  style={{
                    backgroundColor: isDark ? "#2A1A1A" : "#FEF2F2",
                    color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                    border: "1px solid #EF4444",
                  }}
                >
                  <span>{boundary}</span>
                  <button
                    onClick={() => handleRemoveBoundary(index)}
                    className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-xs hover:opacity-70"
                    style={{ color: "#EF4444" }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newBoundary}
                onChange={(e) => setNewBoundary(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddBoundary()}
                placeholder="Add a boundary..."
                className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                  backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                  color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                }}
              />
              <button
                onClick={handleAddBoundary}
                className="rounded-md px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: cortifactColors.accent,
                  color: "#FFFFFF",
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* Updated By */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Created By <span style={{ color: cortifactColors.accent }}>*</span>
            </label>
            <input
              type="text"
              value={updatedBy}
              onChange={(e) => setUpdatedBy(e.target.value)}
              placeholder="Your name or identifier"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
              }}
            />
          </div>

          {/* Selected Tone Preview */}
          <div
            className="rounded-lg border p-4"
            style={{
              borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
              backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
            }}
          >
            <p
              className="mb-1 text-xs"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              Selected Configuration
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}>
                <span style={{ color: cortifactColors.accent }}>{selectedTone.label}</span> tone
              </span>
              <span style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}>
                •
              </span>
              <span style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}>
                {principles.length} principles
              </span>
              <span style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}>
                •
              </span>
              <span style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}>
                {boundaries.length} boundaries
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 border-t px-6 py-4"
          style={{
            backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light,
            borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
          }}
        >
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-md border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!personaName.trim() || !updatedBy.trim()}
              className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: cortifactColors.accent,
                color: "#FFFFFF",
              }}
            >
              Create Persona
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
