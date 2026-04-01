"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useOnboarding } from "contexts/OnboardingContext"
import { useTheme } from "contexts/ThemeContext"
import { Building2, Target, Users, Calendar, Bot, Check, ChevronRight, Star } from "lucide-react"

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Real Estate",
  "Media & Entertainment",
  "Non-Profit",
  "Other"
]

const factoryObjectives = [
  "Automate routine tasks and workflows",
  "Enhance team collaboration and communication",
  "Improve decision-making with AI insights",
  "Streamline customer support and service",
  "Optimize project management and delivery",
  "Increase operational efficiency",
  "Enable data-driven strategies",
  "Support business growth and scaling"
]

const personas = [
  {
    name: "Strategic Assistant",
    description: "Focuses on high-level planning, strategy, and business insights",
    traits: ["Analytical", "Forward-thinking", "Strategic"]
  },
  {
    name: "Team Coordinator",
    description: "Specializes in team communication, collaboration, and workflow management",
    traits: ["Collaborative", "Organized", "Supportive"]
  },
  {
    name: "Process Optimizer",
    description: "Concentrates on efficiency, automation, and process improvement",
    traits: ["Efficient", "Detail-oriented", "Systematic"]
  },
  {
    name: "Innovation Driver",
    description: "Emphasizes creativity, problem-solving, and new opportunities",
    traits: ["Creative", "Innovative", "Adaptable"]
  }
]

const teamSizes = [
  "1-10",
  "11-25", 
  "26-50",
  "51-100",
  "100+"
]

const primaryGoals = [
  "Reduce operational costs",
  "Improve team productivity",
  "Enhance customer satisfaction",
  "Accelerate decision-making",
  "Increase revenue growth",
  "Streamline workflows",
  "Better data insights",
  "Improve work-life balance"
]

export default function BusinessProfileStep() {
  const { state, updateBusinessProfile, updateStep } = useOnboarding()
  const { isDark } = useTheme()
  const [selectedPersona, setSelectedPersona] = useState("")
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const profile = state.businessProfile

  const handleContinue = () => {
    if (profile.companyName && profile.industry && profile.factoryObjective && selectedPersona && profile.teamSize && selectedGoals.length > 0) {
      updateBusinessProfile({
        objectives: selectedObjectives,
        persona: selectedPersona,
        primaryGoals: selectedGoals
      })
      updateStep("completed")
    }
  }

  const toggleObjective = (objective: string) => {
    setSelectedObjectives(prev => 
      prev.includes(objective) 
        ? prev.filter(o => o !== objective)
        : [...prev, objective]
    )
  }

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    )
  }

  const isFormValid = profile.companyName && profile.industry && profile.factoryObjective && selectedPersona && profile.teamSize && selectedGoals.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          Configure Your Business Profile
        </h3>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Help us understand your business to customize your Factory experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
          <h4 className={`mb-4 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            Company Information
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Company Name
              </label>
              <input
                type="text"
                value={profile.companyName}
                onChange={(e) => updateBusinessProfile({ companyName: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? "border-gray-600 bg-gray-700 text-white" 
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Industry
              </label>
              <select
                value={profile.industry}
                onChange={(e) => updateBusinessProfile({ industry: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? "border-gray-600 bg-gray-700 text-white" 
                    : "border-gray-300 bg-white text-gray-900"
                }`}
              >
                <option value="">Select industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Factory Objective */}
        <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
          <h4 className={`mb-4 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            Primary Factory Objective
          </h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {factoryObjectives.map(objective => (
              <button
                key={objective}
                onClick={() => updateBusinessProfile({ factoryObjective: objective })}
                className={`rounded-lg border p-3 text-left text-sm transition-all ${
                  profile.factoryObjective === objective
                    ? isDark 
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-blue-500 bg-blue-50 text-blue-600"
                    : isDark
                      ? "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    profile.factoryObjective === objective
                      ? "border-blue-500 bg-blue-500"
                      : isDark ? "border-gray-500" : "border-gray-400"
                  }`}>
                    {profile.factoryObjective === objective && <Check className="h-2 w-2 text-white" />}
                  </div>
                  <span>{objective}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Team Size */}
        <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
          <h4 className={`mb-4 font-medium flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <Users className="h-4 w-4" />
            Team Size
          </h4>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {teamSizes.map(size => (
              <button
                key={size}
                onClick={() => updateBusinessProfile({ teamSize: size })}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  profile.teamSize === size
                    ? isDark 
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-blue-500 bg-blue-50 text-blue-600"
                    : isDark
                      ? "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Factory Persona */}
        <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
          <h4 className={`mb-4 font-medium flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <Bot className="h-4 w-4" />
            Factory Persona
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {personas.map(persona => (
              <button
                key={persona.name}
                onClick={() => setSelectedPersona(persona.name)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  selectedPersona === persona.name
                    ? isDark 
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-blue-500 bg-blue-50"
                    : isDark
                      ? "border-gray-600 bg-gray-700 hover:border-gray-500"
                      : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    selectedPersona === persona.name
                      ? "border-blue-500 bg-blue-500"
                      : isDark ? "border-gray-500" : "border-gray-400"
                  }`}>
                    {selectedPersona === persona.name && <Check className="h-2 w-2 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {persona.name}
                    </h5>
                    <p className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {persona.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {persona.traits.map(trait => (
                        <span
                          key={trait}
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            isDark ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Standup Configuration */}
        <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
          <h4 className={`mb-4 font-medium flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <Calendar className="h-4 w-4" />
            Standup Frequency
          </h4>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "biweekly", label: "Bi-weekly" },
              { value: "custom", label: "Custom" }
            ].map(freq => (
              <button
                key={freq.value}
                onClick={() => updateBusinessProfile({ standupFrequency: freq.value as any })}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  profile.standupFrequency === freq.value
                    ? isDark 
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-blue-500 bg-blue-50 text-blue-600"
                    : isDark
                      ? "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {freq.label}
              </button>
            ))}
          </div>
          {profile.standupFrequency === "custom" && (
            <div className="mt-3">
              <label className={`mb-2 block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Custom interval (days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={profile.standupCustomDays || ""}
                onChange={(e) => updateBusinessProfile({ standupCustomDays: parseInt(e.target.value) })}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? "border-gray-600 bg-gray-700 text-white" 
                    : "border-gray-300 bg-white text-gray-900"
                }`}
                placeholder="Enter number of days"
              />
            </div>
          )}
        </div>

        {/* Primary Goals */}
        <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
          <h4 className={`mb-4 font-medium flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            <Target className="h-4 w-4" />
            Primary Goals (Select all that apply)
          </h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {primaryGoals.map(goal => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`rounded-lg border p-3 text-left text-sm transition-all ${
                  selectedGoals.includes(goal)
                    ? isDark 
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-blue-500 bg-blue-50 text-blue-600"
                    : isDark
                      ? "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                    selectedGoals.includes(goal)
                      ? "border-blue-500 bg-blue-500"
                      : isDark ? "border-gray-500" : "border-gray-400"
                  }`}>
                    {selectedGoals.includes(goal) && <Check className="h-2 w-2 text-white" />}
                  </div>
                  <span>{goal}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleContinue}
          disabled={!isFormValid}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
            isFormValid
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
              : isDark
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Complete Setup
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Factory Objective Badge */}
      {profile.factoryObjective && (
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
            isDark ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400" : "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
          }`}>
            <Star className="h-4 w-4" />
            <span className="font-medium">Factory Objective Active</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
