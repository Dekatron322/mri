"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface SubscriptionTierSelectorProps {
  value: "free" | "pro" | "max"
  onChange: (value: "free" | "pro" | "max") => void
  isDark?: boolean
}

export default function SubscriptionTierSelector({ value, onChange, isDark = false }: SubscriptionTierSelectorProps) {
  const tiers = [
    {
      id: "free" as const,
      name: "Free",
      tagline: "Perfect for getting started",
      price: "$0",
      priceDetail: "/month",
      cta: "Select Free",
      features: [
        "Basic AI capabilities",
        "5 requests per day",
        "Community support",
        "Standard response time",
        "Web access",
      ],
      highlighted: false,
    },
    {
      id: "pro" as const,
      name: "Pro",
      tagline: "For power users",
      price: "$20",
      priceDetail: "/month",
      cta: "Select Pro",
      features: [
        "Everything in Free",
        "Unlimited requests",
        "Priority response time",
        "Advanced AI models",
        "Email support",
        "API access",
      ],
      highlighted: true,
    },
    {
      id: "max" as const,
      name: "Max",
      tagline: "For teams and enterprises",
      price: "$100",
      priceDetail: "/month",
      cta: "Select Max",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "SLA guarantee",
        "White-label options",
      ],
      highlighted: false,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="mb-4">
        <h2 className={`text-center text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          Choose your plan
        </h2>
        <p className={`mt-1 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Select the best option for your needs. You can upgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all duration-300 ${
              value === tier.id
                ? isDark
                  ? "border-orange-500 bg-gradient-to-b from-orange-500/10 to-transparent shadow-lg shadow-orange-500/10"
                  : "border-orange-600 bg-gradient-to-b from-orange-50 to-white shadow-lg shadow-orange-500/10"
                : isDark
                ? "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
            onClick={() => onChange(tier.id)}
            whileHover={{ scale: value === tier.id ? 1 : 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Selection indicator - top right */}
            <motion.div
              className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                value === tier.id
                  ? isDark
                    ? "border-orange-500 bg-orange-500"
                    : "border-orange-600 bg-orange-600"
                  : isDark
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300 bg-white"
              }`}
              animate={{ scale: value === tier.id ? 1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {value === tier.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                >
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.div>

            {/* Plan header */}
            <div className="mb-3 pr-8">
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{tier.name}</h3>
                {tier.highlighted && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      isDark ? "bg-orange-500/20 text-orange-300" : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    Popular
                  </span>
                )}
              </div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{tier.tagline}</p>
            </div>

            {/* Price */}
            <div className="mb-3">
              <span className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{tier.price}</span>
              <span className={`ml-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{tier.priceDetail}</span>
            </div>

            {/* CTA Button */}
            <motion.button
              className={`mb-3 w-full rounded-lg py-2 text-xs font-medium transition-all ${
                value === tier.id
                  ? isDark
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                  : isDark
                  ? "border border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation()
                onChange(tier.id)
              }}
            >
              {value === tier.id ? "Selected" : tier.cta}
            </motion.button>

            {/* Divider */}
            <div className={`mb-3 h-px ${isDark ? "bg-gray-700" : "bg-gray-200"} flex-shrink-0`} />

            {/* Features list */}
            <ul className="flex-grow space-y-2">
              {tier.features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                >
                  <div
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      value === tier.id
                        ? isDark
                          ? "bg-orange-500/20"
                          : "bg-orange-100"
                        : isDark
                        ? "bg-gray-700"
                        : "bg-gray-100"
                    }`}
                  >
                    <Check
                      className={`h-2.5 w-2.5 ${
                        value === tier.id
                          ? isDark
                            ? "text-orange-400"
                            : "text-orange-600"
                          : isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
