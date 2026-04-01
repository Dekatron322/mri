"use client"

import { useState } from "react"
import {
  cortifactColors,
  slideInRight,
  fadeIn,
  type Member,
  type Role,
} from "./types"

interface AddMemberModalProps {
  isOpen: boolean
  isDark: boolean
  onClose: () => void
  onAdd: (member: Omit<Member, "id" | "joinedAt" | "status">) => void
}

const departments = [
  {
    key: "Engineering",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    key: "Product",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    key: "Design",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    key: "Marketing",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    key: "Sales",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: "DevOps",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    key: "Other",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    ),
  },
]

const roles = [
  {
    key: "Member",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    key: "Admin",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    key: "Owner",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    key: "Viewer",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  {
    key: "Other",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    ),
  },
]

const authorityLevels = [
  {
    key: "Low",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    key: "Medium",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    key: "High",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
]

const channels = [
  { key: "Email", icon: "/gmail.png", label: "Email" },
  { key: "Slack", icon: "/slack.png", label: "Slack" },
  { key: "WhatsApp", icon: "/whatsapp.png", label: "WhatsApp" },
  { key: "Discord", icon: "/discord.png", label: "Discord" },
  { key: "Telegram", icon: "/telegram.png", label: "Telegram" },
  { key: "Teams", icon: "/teams-icon.png", label: "Teams" },
  { key: "Other", icon: null, label: "Other" },
]

export default function AddMemberModal({ isOpen, isDark, onClose, onAdd }: AddMemberModalProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"Admin" | "Member" | string>("Member")
  const [roleOther, setRoleOther] = useState("")
  const [department, setDepartment] = useState("")
  const [departmentOther, setDepartmentOther] = useState("")
  const [authorityLevel, setAuthorityLevel] = useState<"Low" | "Medium" | "High">("Medium")
  const [preferredChannel, setPreferredChannel] = useState<
    "Email" | "Slack" | "WhatsApp" | "Discord" | "Telegram" | "Teams" | string
  >("Email")
  const [preferredChannelOther, setPreferredChannelOther] = useState("")
  const [specialization, setSpecialization] = useState("")

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!email.trim() || !fullName.trim()) return

    const finalRole = role === "Other" ? roleOther : role
    const finalDepartment = department === "Other" ? departmentOther : department
    const finalPreferredChannel = preferredChannel === "Other" ? preferredChannelOther : preferredChannel

    onAdd({
      name: fullName.split(" ")[0] ?? fullName,
      fullName,
      email,
      role: (finalRole as Role) || "Member",
      department: finalDepartment || undefined,
      authorityLevel,
      preferredChannel: finalPreferredChannel as "Email" | "Slack" | "Teams" | "Discord" | undefined,
      specialization: specialization || undefined,
    })

    resetForm()
    onClose()
  }

  const resetForm = () => {
    setFullName("")
    setEmail("")
    setRole("Member")
    setRoleOther("")
    setDepartment("")
    setDepartmentOther("")
    setAuthorityLevel("Medium")
    setPreferredChannel("Email")
    setPreferredChannelOther("")
    setSpecialization("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <style>{slideInRight}</style>
      <style>{fadeIn}</style>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        style={{ animation: "fadeIn 0.3s ease-out" }}
        onClick={handleClose}
      />
      <div
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col shadow-xl"
        style={{
          backgroundColor: isDark ? cortifactColors.bg.dark : cortifactColors.bg.light,
          animation: "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light }}
        >
          <div>
            <h3
              className="text-lg font-medium"
              style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
            >
              Add team member
            </h3>
            <p
              className="text-sm"
              style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
            >
              Invite a new member to your organization
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: isDark ? cortifactColors.text.muted.dark : cortifactColors.text.muted.light }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name..."
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                  backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                  color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                }}
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                  backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                  color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                }}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Department
              </label>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept.key}
                    onClick={() => setDepartment(dept.key)}
                    className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
                    style={{
                      borderColor:
                        department === dept.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.border.dark
                          : cortifactColors.border.light,
                      backgroundColor:
                        department === dept.key
                          ? `${cortifactColors.accent}20`
                          : isDark
                          ? cortifactColors.sidebar.dark
                          : cortifactColors.sidebar.light,
                      color:
                        department === dept.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.text.dark
                          : cortifactColors.text.light,
                    }}
                  >
                    {dept.icon}
                    {dept.key}
                  </button>
                ))}
              </div>
              {department === "Other" && (
                <input
                  type="text"
                  value={departmentOther}
                  onChange={(e) => setDepartmentOther(e.target.value)}
                  placeholder="Enter department..."
                  className="mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none"
                  style={{
                    borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                    backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                    color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                  }}
                />
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Role *
              </label>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
                    style={{
                      borderColor:
                        role === r.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.border.dark
                          : cortifactColors.border.light,
                      backgroundColor:
                        role === r.key
                          ? `${cortifactColors.accent}20`
                          : isDark
                          ? cortifactColors.sidebar.dark
                          : cortifactColors.sidebar.light,
                      color:
                        role === r.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.text.dark
                          : cortifactColors.text.light,
                    }}
                  >
                    {r.icon}
                    {r.key}
                  </button>
                ))}
              </div>
              {role === "Other" && (
                <input
                  type="text"
                  value={roleOther}
                  onChange={(e) => setRoleOther(e.target.value)}
                  placeholder="Enter custom role..."
                  className="mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none"
                  style={{
                    borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                    backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                    color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                  }}
                />
              )}
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Authority Level
              </label>
              <div className="flex flex-wrap gap-2">
                {authorityLevels.map((level) => (
                  <button
                    key={level.key}
                    onClick={() => setAuthorityLevel(level.key as "Low" | "Medium" | "High")}
                    className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
                    style={{
                      borderColor:
                        authorityLevel === level.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.border.dark
                          : cortifactColors.border.light,
                      backgroundColor:
                        authorityLevel === level.key
                          ? `${cortifactColors.accent}20`
                          : isDark
                          ? cortifactColors.sidebar.dark
                          : cortifactColors.sidebar.light,
                      color:
                        authorityLevel === level.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.text.dark
                          : cortifactColors.text.light,
                    }}
                  >
                    {level.icon}
                    {level.key}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Preferred Communication Channel
              </label>
              <div className="flex flex-wrap gap-2">
                {channels.map((channel) => (
                  <button
                    key={channel.key}
                    onClick={() => setPreferredChannel(channel.key)}
                    className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
                    style={{
                      borderColor:
                        preferredChannel === channel.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.border.dark
                          : cortifactColors.border.light,
                      backgroundColor:
                        preferredChannel === channel.key
                          ? `${cortifactColors.accent}20`
                          : isDark
                          ? cortifactColors.sidebar.dark
                          : cortifactColors.sidebar.light,
                      color:
                        preferredChannel === channel.key
                          ? cortifactColors.accent
                          : isDark
                          ? cortifactColors.text.dark
                          : cortifactColors.text.light,
                    }}
                  >
                    {channel.icon ? (
                      <img src={channel.icon} alt={channel.label} className="h-4 w-4 object-contain" />
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                    )}
                    {channel.label}
                  </button>
                ))}
              </div>
              {preferredChannel === "Other" && (
                <input
                  type="text"
                  value={preferredChannelOther}
                  onChange={(e) => setPreferredChannelOther(e.target.value)}
                  placeholder="Enter preferred channel..."
                  className="mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none"
                  style={{
                    borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                    backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                    color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                  }}
                />
              )}
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium"
                style={{ color: isDark ? cortifactColors.text.dark : cortifactColors.text.light }}
              >
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g., Frontend, Backend, DevOps, Design..."
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
                  backgroundColor: isDark ? cortifactColors.sidebar.dark : cortifactColors.sidebar.light,
                  color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-end gap-3 border-t px-6 py-4"
          style={{ borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light }}
        >
          <button
            onClick={handleClose}
            className="rounded-md border px-4 py-2 text-sm transition-colors"
            style={{
              borderColor: isDark ? cortifactColors.border.dark : cortifactColors.border.light,
              color: isDark ? cortifactColors.text.dark : cortifactColors.text.light,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!email.trim() || !fullName.trim()}
            className="rounded-md px-4 py-2 text-sm text-white transition-colors hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: cortifactColors.accent }}
          >
            Send invite
          </button>
        </div>
      </div>
    </>
  )
}
