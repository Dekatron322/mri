"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useOnboarding } from "contexts/OnboardingContext"
import { useTheme } from "contexts/ThemeContext"
import { User, Mail, Plus, X, Crown } from "lucide-react"

interface TeamMemberFormData {
  name: string
  email: string
  role: "admin" | "member"
}

export default function TeamMembersStep({ onComplete }: { onComplete: () => void }) {
  const { state, addTeamMember, removeTeamMember } = useOnboarding()
  const { isDark } = useTheme()
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: "",
    email: "",
    role: "member"
  })
  const [errors, setErrors] = useState<Partial<TeamMemberFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<TeamMemberFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddMember = () => {
    if (validateForm()) {
      addTeamMember(formData)
      setFormData({ name: "", email: "", role: "member" })
      setErrors({})
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddMember()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Current Members */}
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Your Team
        </h3>
        
        {state.teamMembers.length === 0 ? (
          <div className={`text-center py-8 rounded-lg border-2 border-dashed ${
            isDark ? "border-gray-700 bg-gray-800/50" : "border-gray-300 bg-gray-50"
          }`}>
            <User className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              No team members added yet
            </p>
            <p className={`text-sm mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              Add your first team member to unlock task execution
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {state.teamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                    {member.role === "admin" ? (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <User className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {member.name}
                    </p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {member.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    member.role === "admin"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : isDark 
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                  }`}>
                    {member.role}
                  </span>
                  <button
                    onClick={() => removeTeamMember(member.id)}
                    className={`p-1 rounded transition-colors ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                    }`}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Form */}
      <div>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Add Team Member
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.name
                      ? "border-red-500"
                      : isDark 
                        ? "border-gray-700 bg-gray-800 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  placeholder="john@company.com"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.email
                      ? "border-red-500"
                      : isDark 
                        ? "border-gray-700 bg-gray-800 text-white"
                        : "border-gray-300 bg-white text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Role
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFormData(prev => ({ ...prev, role: "member" }))}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  formData.role === "member"
                    ? "border-blue-500 bg-blue-500 text-white"
                    : isDark
                      ? "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Member
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, role: "admin" }))}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  formData.role === "admin"
                    ? "border-yellow-500 bg-yellow-500 text-white"
                    : isDark
                      ? "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <button
            onClick={handleAddMember}
            className={`w-full py-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>
      </div>

      {/* Continue Button */}
      {state.teamMembers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            onClick={onComplete}
            className={`w-full py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
              isDark
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Continue to Connect Channels
          </button>
          <p className={`text-center text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {state.teamMembers.length} team member{state.teamMembers.length !== 1 ? "s" : ""} added
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
