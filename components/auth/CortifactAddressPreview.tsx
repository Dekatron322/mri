"use client"

import { motion } from "framer-motion"

interface CortifactAddressPreviewProps {
  companyName: string
  isDark?: boolean
}

export default function CortifactAddressPreview({ companyName, isDark = false }: CortifactAddressPreviewProps) {
  const generateCortifactAddress = (companyName: string): string => {
    if (!companyName.trim()) return ""

    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-]+|[-]+$/g, "")

    return `${slug}@cortifact.com`
  }

  const cortifactAddress = generateCortifactAddress(companyName)

  if (!cortifactAddress) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-2 rounded-lg p-3 text-sm ${
        isDark ? "border border-blue-800/50 bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-700"
      }`}
    >
      <span className="font-medium">Your agent address:</span> {cortifactAddress}
    </motion.div>
  )
}
