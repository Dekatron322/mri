"use client"

import { useState, useEffect } from "react"
import { cortifactColors, slideInRight, fadeIn, toneOptions, type PersonaConfig } from "./types"

interface EditPersonaModalProps {
  isOpen: boolean
  isDark: boolean
  persona: PersonaConfig | null
  onClose: () => void
  onSave: () => void
  onUpdate: (persona: PersonaConfig) => void
}

export default function EditPersonaModal({
  isOpen,
  isDark,
  persona,
  onClose,
  onSave,
  onUpdate,
}: EditPersonaModalProps) {
  const [newPrinciple, setNewPrinciple] = useState("")
  const [newBoundary, setNewBoundary] = useState("")

  if (!isOpen || !persona) return null

  const handleAddPrinciple = () => {
    if (newPrinciple.trim() && !persona.principles.includes(newPrinciple.trim())) {
      onUpdate({
        ...persona,
        principles: [...persona.principles, newPrinciple.trim()],
      })
      setNewPrinciple("")
    }
  }

  const handleRemovePrinciple = (index: number) => {
    onUpdate({
      ...persona,
      principles: persona.principles.filter((_, i) => i !== index),
    })
  }

  const handleAddBoundary = () => {
    if (newBoundary.trim() && !persona.boundaries.includes(newBoundary.trim())) {
      onUpdate({
        ...persona,
        boundaries: [...persona.boundaries, newBoundary.trim()],
      })
      setNewBoundary("")
    }
  }

  const handleRemoveBoundary = (index: number) => {
    onUpdate({
      ...persona,
      boundaries: persona.boundaries.filter((_, i) => i !== index),
    })
  }

  const selectedTone = toneOptions.find((t) => t.value === persona.tone) || toneOptions[0]

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
              Edit Persona
            </h2>
            <p
              className="text-xs"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              Update voice and personality configuration
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
              Persona Name
            </label>
            <input
              type="text"
              value={persona.personaName}
              onChange={(e) => onUpdate({ ...persona, personaName: e.target.value })}
              placeholder="e.g., Cortifact Assistant"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:border-transparent"
              style={{
                borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
              }}
            />
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
                onClick={() => onUpdate({ ...persona, status: "Draft" })}
                className="flex flex-1 items-center gap-2 rounded-lg border-2 p-3 text-left transition-all"
                style={{
                  borderColor:
                    persona.status === "Draft"
                      ? cortifactColors.accent
                      : isDark
                      ? cortifactColors.border.dark
                      : cortifactColors.border.light,
                  backgroundColor: persona.status === "Draft" ? (isDark ? "#3D261E" : "#FDF8F6") : "transparent",
                }}
              >
                <div
                  className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor:
                      persona.status === "Draft"
                        ? cortifactColors.accent
                        : isDark
                        ? cortifactColors.text.muted.dark
                        : cortifactColors.text.muted.light,
                    backgroundColor: persona.status === "Draft" ? cortifactColors.accent : "transparent",
                  }}
                >
                  {persona.status === "Draft" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      persona.status === "Draft"
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
                onClick={() => onUpdate({ ...persona, status: "Active" })}
                className="flex flex-1 items-center gap-2 rounded-lg border-2 p-3 text-left transition-all"
                style={{
                  borderColor:
                    persona.status === "Active"
                      ? cortifactColors.accent
                      : isDark
                      ? cortifactColors.border.dark
                      : cortifactColors.border.light,
                  backgroundColor: persona.status === "Active" ? (isDark ? "#1E3D1E" : "#F0FDF4") : "transparent",
                }}
              >
                <div
                  className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor:
                      persona.status === "Active"
                        ? "#22C55E"
                        : isDark
                        ? cortifactColors.text.muted.dark
                        : cortifactColors.text.muted.light,
                    backgroundColor: persona.status === "Active" ? "#22C55E" : "transparent",
                  }}
                >
                  {persona.status === "Active" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      persona.status === "Active"
                        ? "#22C55E"
                        : isDark
                        ? cortifactColors.text.dark
                        : cortifactColors.text.light,
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
                  onClick={() => onUpdate({ ...persona, tone: toneOption.value })}
                  className="flex items-center gap-3 rounded-lg border p-3 text-left transition-all"
                  style={{
                    borderColor:
                      persona.tone === toneOption.value
                        ? cortifactColors.accent
                        : isDark
                        ? cortifactColors.border.dark
                        : cortifactColors.border.light,
                    backgroundColor:
                      persona.tone === toneOption.value ? (isDark ? "#3D261E" : "#FDF8F6") : "transparent",
                  }}
                >
                  <div
                    className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor:
                        persona.tone === toneOption.value
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.text.muted.dark
                          : cortifactColors.text.muted.light,
                      backgroundColor: persona.tone === toneOption.value ? cortifactColors.accent : "transparent",
                    }}
                  >
                    {persona.tone === toneOption.value && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          persona.tone === toneOption.value
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
              {persona.principles.map((principle, index) => (
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
              {persona.boundaries.map((boundary, index) => (
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
              Updated By
            </label>
            <input
              type="text"
              value={persona.updatedBy}
              onChange={(e) => onUpdate({ ...persona, updatedBy: e.target.value })}
              placeholder="Your name or identifier"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
              }}
            />
          </div>

          {/* Configuration Preview */}
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
              Current Configuration
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}>
                <span style={{ color: cortifactColors.accent }}>{selectedTone?.label}</span> tone
              </span>
              <span style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}>
                •
              </span>
              <span style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}>
                {persona.principles.length} principles
              </span>
              <span style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}>
                •
              </span>
              <span style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}>
                {persona.boundaries.length} boundaries
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
              onClick={onSave}
              disabled={!persona.personaName.trim() || !persona.updatedBy.trim()}
              className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: cortifactColors.accent,
                color: "#FFFFFF",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
