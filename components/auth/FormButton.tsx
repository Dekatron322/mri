"use client"

import { motion, HTMLMotionProps } from "framer-motion"

interface FormButtonProps extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap"> {
  variant?: "primary" | "secondary"
  loading?: boolean
  fullWidth?: boolean
  isDark?: boolean
}

export default function FormButton({
  variant = "primary",
  loading = false,
  fullWidth = false,
  isDark = false,
  children,
  className = "",
  disabled,
  ...props
}: FormButtonProps) {
  const baseClasses = "rounded-lg py-3 font-medium transition-all"
  const variantClasses = {
    primary: isDark
      ? "bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      : "bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: isDark
      ? "border border-gray-600 text-gray-200 hover:bg-gray-700"
      : "border border-gray-300 text-gray-700 hover:bg-gray-50",
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      whileHover={{ scale: !disabled && !loading ? 1.02 : 1 }}
      whileTap={{ scale: !disabled && !loading ? 0.98 : 1 }}
      {...(variant === "primary" &&
        !disabled &&
        !loading && {
          whileHover: { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" },
        })}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <motion.div
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}
