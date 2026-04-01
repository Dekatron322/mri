"use client"

import { motion } from "framer-motion"
import { ChangeEvent } from "react"

interface FormInputProps {
  label: string
  error?: string
  helperText?: string
  className?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  placeholder?: string
  type?: string
  name?: string
  id?: string
  required?: boolean
  disabled?: boolean
  autoComplete?: string
  isDark?: boolean
}

export default function FormInput({
  label,
  error,
  helperText,
  className = "",
  value,
  onChange,
  onFocus,
  placeholder,
  type = "text",
  name,
  id,
  required,
  disabled,
  autoComplete,
  isDark = false,
}: FormInputProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>{label}</label>
      <motion.input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`w-full rounded-lg border p-3 transition-all focus:outline-none focus:ring-2 ${
          isDark
            ? "border-gray-600 bg-gray-700 text-gray-100 focus:border-indigo-400 focus:ring-indigo-400/20"
            : "border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/20"
        } ${error ? "border-red-400" : ""} ${className}`}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      {error && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-500">
          {error}
        </motion.p>
      )}
      {helperText && !error && (
        <p className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{helperText}</p>
      )}
    </motion.div>
  )
}
