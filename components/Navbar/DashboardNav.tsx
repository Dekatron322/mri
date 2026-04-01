"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import Link from "next/link"

import { usePathname } from "next/navigation"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Image from "next/image"
import { ButtonModule } from "components/ui/Button/Button"
import WaitlistModal from "components/Modal/WaitlistModal"

const DashboardNav = () => {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Ensure we only render after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["products", "use-cases", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100 // Add offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Get the actual current theme, considering system preference

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const openDownloadModal = () => {
    setIsDownloadModalOpen(true)
  }

  const openWaitlistModal = () => {
    setIsWaitlistModalOpen(true)
  }

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false)
  }

  const closeWaitlistModal = () => {
    setIsWaitlistModalOpen(false)
  }

  const scrollToSection = (sectionId: string, isExternal: boolean = false) => {
    if (isExternal) {
      // Open external link in new tab
      window.open(sectionId, "_blank", "noopener,noreferrer")
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
      return
    }

    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(sectionId.replace("#", ""))
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NG", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  // SVG animation variants
  const svgVariants = {
    initial: { x: 0 },
    hover: { x: 3, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { x: 1, transition: { duration: 0.1 } },
  }

  // Link animation variants
  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -2, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { y: 0, transition: { duration: 0.1 } },
  }

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "https://calendly.com/thankgod-izime-myultraapp/30min", isExternal: true },
  ]

  // Function to check if a link is active
  const isLinkActive = (href: string) => {
    const sectionId = href.replace("#", "")
    return activeSection === sectionId
  }

  // Mobile menu variants for framer-motion
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const mobileLinkVariants = {
    closed: {
      opacity: 0,
      y: -10,
    },
    open: {
      opacity: 1,
      y: 0,
    },
  }

  // Don't render anything until mounted on client
  if (!mounted) {
    return null
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className={`fixed inset-x-0 top-0 z-50  flex justify-center py-3 backdrop-blur transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="z-50 flex w-full items-center justify-between backdrop-blur max-sm:px-4 md:max-w-[1440px] xl:px-12 2xl:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center whitespace-nowrap rounded-full font-semibold backdrop-blur">
            <Image src="/logo.png" alt="Logo" width={155} height={100} />
          </Link>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="flex items-center justify-center gap-5 max-md:hidden">
            <div className="flex items-center justify-center gap-10 rounded-full">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href)
                return (
                  <motion.div key={link.name} initial="initial" whileHover="hover" whileTap="tap">
                    <button
                      onClick={() => scrollToSection(link.href, link.isExternal || false)}
                      className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                        isActive
                          ? isScrolled
                            ? "font-bold text-[#1447E6]"
                            : "font-bold text-white"
                          : isScrolled
                          ? "text-gray-700 hover:text-[#1447E6]"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className={`nav-link-underline ${isScrolled ? "bg-[#1447E6]" : "bg-white"}`}
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {/* Hover effect - only show if not active */}
                      {!isActive && (
                        <motion.div
                          className={`nav-link-hover-underline ${isScrolled ? "bg-[#1447E6]" : "bg-white"}`}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        />
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Desktop Right Section - Hidden on mobile */}
          <div className="flex items-center justify-end gap-5 max-md:hidden">
            <motion.div
              className="group flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover="hover"
              whileTap="tap"
            >
              {/* <ButtonModule variant="outline" onClick={openDownloadModal} className="gap-2">
                <span>Sign In</span>
                <motion.svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-20 transition-colors duration-300"
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <path
                    d="M9.1497 0.80204C9.26529 3.95101 13.2299 6.51557 16.1451 8.0308L16.1447 9.43036C13.2285 10.7142 9.37889 13.1647 9.37789 16.1971L7.27855 16.1978C7.16304 12.8156 10.6627 10.4818 13.1122 9.66462L0.049716 9.43565L0.0504065 7.33631L13.1129 7.56528C10.5473 6.86634 6.93261 4.18504 7.05036 0.80273L9.1497 0.80204Z"
                    fill="currentColor"
                  />
                </motion.svg>
              </ButtonModule> */}
              <ButtonModule variant="primary" onClick={openWaitlistModal} className="gap-2">
                <span>Join Waitlist</span>
                <motion.svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-20 transition-colors duration-300"
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <path
                    d="M9.1497 0.80204C9.26529 3.95101 13.2299 6.51557 16.1451 8.0308L16.1447 9.43036C13.2285 10.7142 9.37889 13.1647 9.37789 16.1971L7.27855 16.1978C7.16304 12.8156 10.6627 10.4818 13.1122 9.66462L0.049716 9.43565L0.0504065 7.33631L13.1129 7.56528C10.5473 6.86634 6.93261 4.18504 7.05036 0.80273L9.1497 0.80204Z"
                    fill="currentColor"
                  />
                </motion.svg>
              </ButtonModule>
            </motion.div>
          </div>

          {/* Mobile Menu Button - Visible only on mobile */}
          <div className="hidden max-md:flex max-md:items-center max-md:gap-3">
            {/* Theme Toggle for Mobile */}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="text-xl" />
              ) : (
                <MenuIcon className={`text-xl ${isScrolled ? "text-blue-500" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobiletab-bg fixed inset-0 z-10 md:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Content */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="mobiletab-bg fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-b backdrop-blur-lg md:hidden"
            >
              <div className="px-4 py-6">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link, index) => {
                    const isActive = isLinkActive(link.href)
                    return (
                      <motion.div
                        key={link.name}
                        variants={mobileLinkVariants}
                        transition={{ delay: index * 0.1 }}
                        className="pb-4 last:border-b-0 last:pb-0 dark:border-gray-700"
                      >
                        <button
                          onClick={() => scrollToSection(link.href, link.isExternal || false)}
                          className={`nav-link relative flex items-center p-2 text-lg font-medium transition-all duration-200 ${
                            isActive ? "nav-link-active" : "nav-link-inactive"
                          }`}
                        >
                          {link.name}
                          {isActive && <span className="ml-2 size-2 rounded-full bg-blue-600 dark:bg-blue-400" />}
                        </button>
                      </motion.div>
                    )
                  })}

                  {/* Mobile Get Started Button */}
                  <motion.div
                    variants={mobileLinkVariants}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-4"
                  >
                    <button
                      onClick={() => {
                        openDownloadModal()
                        toggleMobileMenu()
                      }}
                      className="button-style flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 transition-all duration-300"
                    >
                      <span>Get Started</span>
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors duration-300"
                      >
                        <path
                          d="M9.1497 0.80204C9.26529 3.95101 13.2299 6.51557 16.1451 8.0308L16.1447 9.43036C13.2285 10.7142 9.37889 13.1647 9.37789 16.1971L7.27855 16.1978C7.16304 12.8156 10.6627 10.4818 13.1122 9.66462L0.049716 9.43565L0.0504065 7.33631L13.1129 7.56528C10.5473 6.86634 6.93261 4.18504 7.05036 0.80273L9.1497 0.80204Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={closeWaitlistModal} />
    </>
  )
}

export default DashboardNav
