"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"

import { VscEye, VscEyeClosed } from "react-icons/vsc"

interface PasswordInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: boolean
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: () => void
  disabled?: boolean
  autoComplete?: string
  onSuggestionRequest?: () => void
  showSuggestion?: boolean
  suggestedPassword?: string
  onAcceptSuggestion?: () => void
  onRejectSuggestion?: () => void
  isDark?: boolean
}

export const PasswordInputModule: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className = "",
  error = false,
  onKeyPress,
  onKeyDown,
  onFocus,
  disabled = false,
  autoComplete,
  onSuggestionRequest,
  showSuggestion = false,
  suggestedPassword = "",
  onAcceptSuggestion,
  onRejectSuggestion,
  isDark = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className={`mb-3 ${className}`}>
      <label className={`mb-1 block text-sm ${isDark ? "text-gray-200" : "text-[#101836]"}`}>{label}</label>
      <div className="relative"></div>
      <div
        className={`
          flex h-[46px] items-center rounded-md border px-3
          py-2 ${error ? "border-[#D14343]" : isDark ? "border-gray-600" : "border-[#E5E7EB]"}
          ${
            isFocused
              ? isDark
                ? "bg-gray-700 focus-within:border-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-400/20 hover:border-indigo-400"
                : "bg-[#FFFFFF] focus-within:border-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500/20 hover:border-indigo-500"
              : isDark
              ? "bg-gray-700"
              : "bg-[#FFFFFF]"
          }
          transition-all duration-200
        `}
      >
        {/* Key Icon on the left side */}

        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          className={`flex-1 bg-transparent text-base outline-none ${isDark ? "text-gray-100" : "text-[#101836]"}`}
          value={value}
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true)
            onFocus?.()
          }}
          onBlur={() => setIsFocused(false)}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className={`ml-2 rounded-full p-1 transition-colors focus:outline-none ${
            isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <VscEye size={24} /> : <VscEyeClosed size={24} />}
        </button>
      </div>

      {/* Password Suggestion UI */}
      {showSuggestion && suggestedPassword && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border p-4 shadow-lg ${
            isDark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className={`mb-1 text-sm font-medium ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                Suggested Password:
              </p>
              <p className={`break-all font-mono text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {suggestedPassword}
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <motion.button
                type="button"
                onClick={onAcceptSuggestion}
                className={`rounded px-3 py-1.5 text-xs text-white transition-colors ${
                  isDark ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-900 hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Use
              </motion.button>
              <motion.button
                type="button"
                onClick={onRejectSuggestion}
                className={`rounded px-3 py-1.5 text-xs transition-colors ${
                  isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Dismiss
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
