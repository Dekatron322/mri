"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { VscChevronDown, VscClose, VscSearch } from "react-icons/vsc"

interface DropdownPopoverProps {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  searchPlaceholder?: string
  enableSearch?: boolean
  noResultsMessage?: string
  onFocus?: () => void
  onToggle?: () => void
  isDark?: boolean
}

export default function DropdownPopover({
  label,
  value,
  options,
  onChange,
  className = "",
  placeholder = "Select an option",
  searchPlaceholder = "Search options...",
  enableSearch = true,
  noResultsMessage = "No options found",
  onFocus,
  onToggle,
  isDark = false,
}: DropdownPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [searchTerm, setSearchTerm] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  // Filter options based on search term
  const filteredOptions = enableSearch
    ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options

  // Reset search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("")
      setHighlightedIndex(-1)
    } else if (enableSearch && searchInputRef.current) {
      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, enableSearch])

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      // Don't handle arrow keys if search input is focused and has content
      const isSearchFocused = enableSearch && document.activeElement === searchInputRef.current
      const hasSearchContent = searchTerm.length > 0

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          if (filteredOptions.length > 0) {
            setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length)
          }
          break
        case "ArrowUp":
          event.preventDefault()
          if (filteredOptions.length > 0) {
            setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length)
          }
          break
        case "Enter":
          event.preventDefault()
          const highlightedOption = filteredOptions[highlightedIndex]
          if (highlightedIndex >= 0 && highlightedOption) {
            onChange(highlightedOption.value)
            setIsOpen(false)
          }
          break
        case "Escape":
          event.preventDefault()
          if (enableSearch && searchTerm.length > 0) {
            setSearchTerm("") // Clear search first
          } else {
            setIsOpen(false) // Close if search is already empty
          }
          break
        case "Tab":
          setIsOpen(false)
          break
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, filteredOptions, highlightedIndex, onChange, enableSearch, searchTerm])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const clearSearch = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSearchTerm("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>{label}</label>

      <motion.button
        type="button"
        className={`relative w-full rounded-lg border p-3 text-left transition-all focus:outline-none focus:ring-2 ${
          isDark
            ? "border-gray-600 bg-gray-700 text-gray-100 focus:border-indigo-400 focus:ring-indigo-400/20"
            : "border-gray-200 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/20"
        } ${
          isOpen
            ? isDark
              ? "border-indigo-400 ring-2 ring-indigo-400/20"
              : "border-indigo-500 ring-2 ring-indigo-500/20"
            : ""
        }`}
        onClick={() => {
          setIsOpen(!isOpen)
          onToggle?.()
        }}
        onFocus={onFocus}
        whileTap={{ scale: 0.98 }}
      >
        <span
          className={`block truncate ${
            value ? (isDark ? "text-gray-100" : "text-gray-900") : isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {selectedOption?.label || placeholder}
        </span>
        <motion.div
          className="absolute right-3 top-1/2"
          animate={{ rotate: isOpen ? 180 : 0, y: "-50%" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ originY: 0.5 }}
        >
          <VscChevronDown size={20} className={isDark ? "text-gray-400" : "text-gray-500"} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border shadow-lg ${
              isDark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-white"
            }`}
          >
            {/* Search Input */}
            {enableSearch && (
              <div className={`border-b p-2 ${isDark ? "border-gray-600" : "border-gray-200"}`}>
                <div className="relative">
                  <VscSearch
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-400"}`}
                    size={16}
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchPlaceholder}
                    className={`w-full rounded-md border py-2 pl-9 pr-8 text-sm focus:outline-none focus:ring-2 ${
                      isDark
                        ? "border-gray-600 bg-gray-700 text-gray-100 focus:border-indigo-400 focus:ring-indigo-400/20"
                        : "border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors ${
                        isDark
                          ? "text-gray-400 hover:bg-gray-600 hover:text-gray-200"
                          : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      }`}
                    >
                      <VscClose size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${
                      option.value === value
                        ? isDark
                          ? "bg-gray-700 font-medium text-gray-100"
                          : "bg-gray-100 font-medium text-gray-900"
                        : isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-50"
                    } ${highlightedIndex === index ? (isDark ? "bg-gray-700" : "bg-gray-50") : ""}`}
                    onClick={() => handleSelect(option.value)}
                    whileHover={{
                      backgroundColor:
                        option.value === value ? (isDark ? "#374151" : "#f3f4f6") : isDark ? "#374151" : "#f9fafb",
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    {option.label}
                  </motion.button>
                ))
              ) : (
                <div className={`px-3 py-8 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {noResultsMessage}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
