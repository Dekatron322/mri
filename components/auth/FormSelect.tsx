"use client"

import { HTMLMotionProps, motion } from "framer-motion"
import { SelectHTMLAttributes } from "react"

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, keyof HTMLMotionProps<"select">> {
  label: string
  error?: string
  options: { value: string; label: string }[]
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function FormSelect({
  label,
  error,
  options,
  className = "",
  value,
  onChange,
  ...props
}: FormSelectProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <motion.select
        className={`focus:ring-grey-500/20 w-full rounded-lg border border-gray-200 p-3 text-gray-900 transition-all focus:border-gray-900 focus:outline-none focus:ring-2 ${className}`}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>
      {error && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-sm text-red-500">
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
