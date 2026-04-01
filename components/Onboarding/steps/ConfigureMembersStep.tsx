"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useOnboarding, MemberChannelAssignment } from "contexts/OnboardingContext"
import { useTheme } from "contexts/ThemeContext"
import { User, Shield, Edit3, Eye, Check, X } from "lucide-react"

interface Permission {
  key: "read" | "write" | "admin"
  label: string
  description: string
  icon: React.ReactNode
  color: string
}

const permissions: Permission[] = [
  {
    key: "read",
    label: "Read",
    description: "View messages and monitor activity",
    icon: <Eye className="h-4 w-4" />,
    color: "blue",
  },
  {
    key: "write",
    label: "Write",
    description: "Send messages and create content",
    icon: <Edit3 className="h-4 w-4" />,
    color: "green",
  },
  {
    key: "admin",
    label: "Admin",
    description: "Manage channel settings and permissions",
    icon: <Shield className="h-4 w-4" />,
    color: "yellow",
  },
]

const permissionColors = {
  read: "bg-blue-500",
  write: "bg-green-500",
  admin: "bg-yellow-500",
}

export default function ConfigureMembersStep({ onComplete }: { onComplete: () => void }) {
  const { state, assignMemberToChannel, removeMemberAssignment } = useOnboarding()
  const { isDark } = useTheme()
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [tempPermissions, setTempPermissions] = useState<("read" | "write" | "admin")[]>(["read"])

  const getMemberAssignments = (memberId: string) => {
    return state.memberAssignments.filter((ma) => ma.memberId === memberId)
  }

  const getChannelAssignments = (channelId: string) => {
    return state.memberAssignments.filter((ma) => ma.channelId === channelId)
  }

  const handleAssignPermissions = () => {
    if (selectedMember && selectedChannel) {
      assignMemberToChannel({
        memberId: selectedMember,
        channelId: selectedChannel,
        permissions: tempPermissions,
      })

      // Reset selection
      setSelectedMember(null)
      setSelectedChannel(null)
      setTempPermissions(["read"])
    }
  }

  const handleTogglePermission = (permission: "read" | "write" | "admin") => {
    setTempPermissions((prev) => {
      if (prev.includes(permission)) {
        // Don't allow removing read if it's the only permission
        if (permission === "read" && prev.length === 1) return prev
        return prev.filter((p) => p !== permission)
      } else {
        return [...prev, permission]
      }
    })
  }

  const handleRemoveAssignment = (memberId: string, channelId: string) => {
    removeMemberAssignment(memberId, channelId)
  }

  const hasAssignments = state.memberAssignments.length > 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className={`mb-2 text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          Configure Member Access
        </h3>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Set who can do what in which channels. The Factory respects your team structure.
        </p>
      </div>

      {/* Assignment Form */}
      <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Member Selection */}
          <div>
            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Select Member
            </label>
            <div className="space-y-2">
              {state.teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`w-full rounded-lg border p-2 text-left transition-colors ${
                    selectedMember === member.id
                      ? "border-blue-500 bg-blue-500/10"
                      : isDark
                      ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                    <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{member.name}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        member.role === "admin"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Channel Selection */}
          <div>
            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Select Channel
            </label>
            <div className="space-y-2">
              {state.connectedChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`w-full rounded-lg border p-2 text-left transition-colors ${
                    selectedChannel === channel.id
                      ? "border-blue-500 bg-blue-500/10"
                      : isDark
                      ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-4 w-4 rounded-full ${
                        permissionColors[channel.type as keyof typeof permissionColors] || "bg-gray-500"
                      }`}
                    />
                    <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{channel.name}</span>
                    <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{channel.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Permission Selection */}
        {selectedMember && selectedChannel && (
          <div className="mb-4">
            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Permissions
            </label>
            <div className="flex gap-2">
              {permissions.map((permission) => (
                <button
                  key={permission.key}
                  onClick={() => handleTogglePermission(permission.key)}
                  className={`rounded-lg border px-3 py-2 transition-colors ${
                    tempPermissions.includes(permission.key)
                      ? `border-${permission.color}-500 bg-${permission.color}-500/10 text-${permission.color}-500`
                      : isDark
                      ? "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {permission.icon}
                    <span className="text-sm">{permission.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className={`mt-2 text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {permissions
                .filter((p) => tempPermissions.includes(p.key))
                .map((p) => p.description)
                .join(" • ")}
            </div>
          </div>
        )}

        {/* Assign Button */}
        {selectedMember && selectedChannel && (
          <button
            onClick={handleAssignPermissions}
            className={`w-full transform rounded-lg py-2 font-medium transition-all hover:scale-105 ${
              isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Assign Permissions
          </button>
        )}
      </div>

      {/* Current Assignments */}
      {hasAssignments && (
        <div>
          <h4 className={`mb-3 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Current Assignments</h4>
          <div className="space-y-2">
            {state.memberAssignments.map((assignment) => {
              const member = state.teamMembers.find((m) => m.id === assignment.memberId)
              const channel = state.connectedChannels.find((c) => c.id === assignment.channelId)

              if (!member || !channel) return null

              return (
                <motion.div
                  key={`${assignment.memberId}-${assignment.channelId}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-lg border p-3 ${
                    isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <User className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{member.name}</p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {channel.name} ({channel.type})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {assignment.permissions.map((permission) => (
                          <div
                            key={permission}
                            className={`h-6 w-6 rounded-full ${permissionColors[permission]} flex items-center justify-center text-white`}
                            title={permissions.find((p) => p.key === permission)?.description}
                          >
                            {permissions.find((p) => p.key === permission)?.icon}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => handleRemoveAssignment(assignment.memberId, assignment.channelId)}
                        className={`rounded p-1 transition-colors ${
                          isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Continue Button */}
      {hasAssignments && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-gray-200 pt-4 dark:border-gray-700"
        >
          <button
            onClick={onComplete}
            className={`w-full transform rounded-lg py-3 font-medium transition-all hover:scale-105 ${
              isDark ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Complete Setup
          </button>
          <p className={`mt-2 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {state.memberAssignments.length} member-channel assignment{state.memberAssignments.length !== 1 ? "s" : ""}{" "}
            configured
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
