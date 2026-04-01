"use client"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FiSun } from "react-icons/fi"
import { IoMoonOutline } from "react-icons/io5"
import WaitlistModal from "components/Modal/WaitlistModal"

const Footer = () => {
  const [isMoonIcon, setIsMoonIcon] = useState(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)

  const toggleIcon = () => {
    setIsMoonIcon(!isMoonIcon)
  }

  const openWaitlistModal = () => {
    setIsWaitlistModalOpen(true)
  }

  const closeWaitlistModal = () => {
    setIsWaitlistModalOpen(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-12 sm:py-16 lg:items-start lg:px-8 xl:px-12 2xl:px-16">
      <div className="flex w-full flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center sm:items-start">
          <Link href="/" className="flex items-center whitespace-nowrap rounded-full font-semibold backdrop-blur">
            <Image src="/logo.png" alt="Logo" width={155} height={100} />
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <Image src="/Icons/facebook.svg" alt="Facebook" width={12} height={16} />
            <a
              href="https://www.linkedin.com/company/ultrapayfinance/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-80"
              aria-label="LinkedIn"
            >
              <Image src="/Icons/linkedin.svg" alt="LinkedIn" width={20} height={16} />
            </a>
            <a
              href="https://www.instagram.com/ultrapayhq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-4 items-center justify-center text-gray-600 transition-opacity duration-200 hover:text-[#1447E6] hover:opacity-80"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </a>
            <a
              href="https://x.com/ultrapayhq"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-80"
            >
              <Image src="/Icons/twitter.svg" alt="Twitter" width={16} height={16} />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <Link
            href="/"
            className="flex items-center whitespace-nowrap rounded-full text-sm font-semibold backdrop-blur sm:text-base"
          >
            Products
          </Link>
          <Link
            href="https://calendly.com/thankgod-izime-myultraapp/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center whitespace-nowrap rounded-full text-sm font-semibold text-gray-700 backdrop-blur transition-colors duration-200 ease-in-out hover:text-[#1447E6] sm:text-base"
          >
            Contact Sales
          </Link>
          <button
            onClick={openWaitlistModal}
            className="flex items-center whitespace-nowrap rounded-full text-sm font-semibold text-gray-700 backdrop-blur transition-colors duration-200 ease-in-out hover:bg-blue-50 hover:text-[#1447E6] sm:text-base"
          >
            Join Waitlist
          </button>
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 border-b border-gray-200 pb-3 text-sm sm:mt-10 sm:flex-row">
        <p className="text-center sm:text-left">© 2026 UltraPay. All rights reserved.</p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <Link
            href="/"
            className="text-sm text-[#1447E6] transition-colors duration-200 ease-in-out hover:text-blue-900 sm:text-base"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/"
            className="text-sm text-[#1447E6] transition-colors duration-200 ease-in-out hover:text-blue-900 sm:text-base"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center sm:mt-10 sm:text-left">
        <p className="text-sm sm:text-base">UltraPay is a product of Ultra Techologies.</p>
        <p className="mt-2 max-w-full text-sm sm:text-base">
          UltraPay is a business-grade crypto payment gateway designed to help merchants accept crypto payments globally
          while receiving fiat settlement into verified bank accounts. UltraPay abstracts blockchain complexity,
          volatility, and compliance into a secure, easy-to-use payment infrastructure.
        </p>
        <p className="mt-2 max-w-full text-sm sm:text-base">
          AveryLab operates UltraPay with a compliance-first approach. Merchant onboarding is subject to business
          verification (KYB). Settlement availability and supported services may vary by jurisdiction and are subject to
          applicable laws and regulations.
        </p>
        <p className="mt-2 max-w-full text-sm sm:text-base">
          UltraPay does not provide custody of customer funds. Crypto payments are processed through managed payment
          flows, and fiat settlements are executed through regulated financial partners. Bank account changes and
          withdrawals may require additional review.
        </p>
        <p className="mt-2 max-w-full text-sm sm:text-base">
          The information on this website is not intended for residents of jurisdictions where the use of crypto payment
          services is restricted or prohibited by law. Please review our terms and consult professional advisors where
          necessary.
        </p>
        <p className="mt-2 max-w-full text-sm sm:text-base">
          Products and services described on this website may be provided by different entities within the AveryLab
          group. The specific entity providing services to you will be identified in the applicable service agreement.
        </p>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={closeWaitlistModal} />
    </div>
  )
}

export default Footer
function setMounted(arg0: boolean) {
  throw new Error("Function not implemented.")
}
