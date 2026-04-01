"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useOnboarding, OnboardingStep } from "contexts/OnboardingContext"
import { useTheme } from "contexts/ThemeContext"
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building2,
  CheckCircle,
  Users,
  MessageCircle,
  Settings,
} from "lucide-react"
import TeamMembersStep from "./steps/TeamMembersStep"
import ConnectChannelsStep from "./steps/ConnectChannelsStep"
import ConfigureMembersStep from "./steps/ConfigureMembersStep"
import BusinessProfileStep from "./steps/BusinessProfileStep"

// Grid icon
const GridIcon = ({ isDark }: { isDark: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={isDark ? "text-gray-600" : "text-gray-300"}
  >
    <path d="M4 4H8V8H4V4Z" fill="currentColor" />
    <path d="M10 4H14V8H10V4Z" fill="currentColor" />
    <path d="M16 4H20V8H16V4Z" fill="currentColor" />
    <path d="M4 10H8V14H4V10Z" fill="currentColor" />
    <path d="M10 10H14V14H10V10Z" fill="currentColor" />
    <path d="M16 10H20V14H16V10Z" fill="currentColor" />
    <path d="M4 16H8V20H4V16Z" fill="currentColor" />
    <path d="M10 16H14V20H10V16Z" fill="currentColor" />
    <path d="M16 16H20V20H16V16Z" fill="currentColor" />
  </svg>
)

// Colorful neural thread — represents persistent memory with data flow
const ColorfulThreadLine = ({ delay, top, color }: { delay: number; top: string; color: string }) => (
  <motion.div
    className="absolute h-px"
    style={{
      width: "80%",
      left: "10%",
      top,
      background: `linear-gradient(90deg, transparent 0%, ${color} 20%, ${color} 80%, transparent 100%)`,
      boxShadow: `0 0 8px ${color}`,
    }}
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 1] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
)

// Colored circuit node
const ColoredCircuitNode = ({
  top,
  left,
  delay,
  color,
}: {
  top: string
  left: string
  delay: number
  color: string
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      top,
      left,
      width: "6px",
      height: "6px",
      backgroundColor: color,
      boxShadow: `0 0 10px ${color}`,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 2, 1], opacity: [0, 1, 0.8] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
  />
)

// Color pulse wave
const ColorWave = ({ delay, top, color }: { delay: number; top: string; color: string }) => (
  <motion.div
    className="absolute h-20 blur-xl"
    style={{
      width: "100%",
      left: 0,
      top,
      background: `radial-gradient(ellipse at center, ${color}20 0%, transparent 70%)`,
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.3, 0] }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    }}
  />
)

// Theme-aware icon components
const MessageCircleIcon = ({ isDark }: { isDark: boolean }) => (
  <MessageCircle className={`h-6 w-6 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
)

const CheckCircleIcon = ({ isDark }: { isDark: boolean }) => (
  <CheckCircle className={`h-6 w-6 ${isDark ? "text-green-400" : "text-green-600"}`} />
)

const UsersIcon = ({ isDark }: { isDark: boolean }) => (
  <Users className={`h-6 w-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
)

const SettingsIcon = ({ isDark }: { isDark: boolean }) => (
  <Settings className={`h-6 w-6 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
)

const Building2Icon = ({ isDark }: { isDark: boolean }) => (
  <Building2 className={`h-6 w-6 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
)

const SparklesIcon = ({ isDark }: { isDark: boolean }) => (
  <Sparkles className={`h-6 w-6 ${isDark ? "text-yellow-400" : "text-yellow-600"}`} />
)

interface OnboardingWizardProps {
  isOpen: boolean
  onClose: () => void
  forceStep?: OnboardingStep
}

const stepInfo = {
  email_verified: {
    title: "Welcome to Corticalfactory",
    description:
      "Your AI workspace is ready. Let's set up your team and channels to unlock the full power of autonomous operations.",
    icon: CheckCircleIcon,
  },
  team_members: {
    title: "Add Team Members",
    description:
      "Invite your team members to collaborate with your Factory. Each member will have access to the channels you connect.",
    icon: UsersIcon,
  },
  connect_channels: {
    title: "Connect Communication Channels",
    description:
      "Connect your team's communication channels (Slack, Discord, etc.) to enable Factory monitoring and participation.",
    icon: MessageCircleIcon,
  },
  configure_members: {
    title: "Configure Member Access",
    description:
      "Set permissions for each team member on connected channels. Define who can read, write, or administer.",
    icon: SettingsIcon,
  },
  business_profile: {
    title: "Configure Business Profile",
    description:
      "Tell us about your business objectives, team structure, and preferences to customize your Factory experience.",
    icon: Building2Icon,
  },
  completed: {
    title: "Setup Complete!",
    description:
      "Your Factory is now configured and ready to operate autonomously. Start by monitoring your team's communications.",
    icon: SparklesIcon,
  },
} as const

export default function OnboardingWizard({ isOpen, onClose, forceStep }: OnboardingWizardProps) {
  const { state, updateStep, getStepProgress, getFactoryCapabilities } = useOnboarding()
  const { isDark } = useTheme()
  const [isMinimized, setIsMinimized] = useState(false)

  const currentStep = forceStep || state.currentStep
  const stepInfo_data = stepInfo[currentStep]
  const progress = getStepProgress()
  const capabilities = getFactoryCapabilities()

  // Color palette
  const colors = {
    blue: "#3b82f6",
    cyan: "#06b6d4",
    purple: "#8b5cf6",
    pink: "#ec4899",
    amber: "#f59e0b",
    emerald: "#10b981",
  }

  if (!isOpen) return null

  const renderStepContent = () => {
    switch (currentStep) {
      case "email_verified":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-center">
            <div className="text-6xl">✉️</div>
            <div>
              <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Email Verified Successfully
              </h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Your account is ready! Let's configure your Factory to start monitoring your team's communications.
              </p>
            </div>
            <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
              <h4 className={`mb-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>What happens next:</h4>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Add team members to collaborate with
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Connect communication channels
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Configure member permissions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Set up business profile and objectives
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => updateStep("team_members")}
              className={`mx-auto flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )

      case "team_members":
        return <TeamMembersStep onComplete={() => updateStep("connect_channels")} />
      case "connect_channels":
        return <ConnectChannelsStep onComplete={() => updateStep("configure_members")} />
      case "configure_members":
        return <ConfigureMembersStep onComplete={() => updateStep("business_profile")} />
      case "business_profile":
        return <BusinessProfileStep />
      case "completed":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-center">
            <div className="text-6xl">🎉</div>
            <div>
              <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Factory Configuration Complete!
              </h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Your Factory is now operational and ready to assist your team.
              </p>
            </div>
            <div className={`rounded-lg p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
              <h4 className={`mb-3 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                Your Factory is now capable of:
              </h4>
              <div className="space-y-2 text-left">
                {capabilities.canMonitor && (
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Monitoring team communications
                    </span>
                  </div>
                )}
                {capabilities.canExecute && (
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Executing automated tasks
                    </span>
                  </div>
                )}
                {capabilities.canCollaborate && (
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Collaborating across channels
                    </span>
                  </div>
                )}
                {capabilities.canIntegrate && (
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Full system integration
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className={`mx-auto flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                isDark
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
              }`}
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Background pattern — large grid with colorful overlays */}
        <div className="absolute inset-0">
          {/* Primary large grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, ${
                isDark ? "#374151" : "#d4d4d4"
              } 1px, transparent 1px), linear-gradient(to bottom, ${
                isDark ? "#374151" : "#d4d4d4"
              } 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              opacity: isDark ? 0.3 : 0.6,
            }}
          />

          {/* Secondary diagonal grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, ${isDark ? "#4b5563" : "#c0c0c0"} 0.5px, transparent 0.5px)`,
              backgroundSize: "84px 84px",
              opacity: isDark ? 0.15 : 0.25,
            }}
          />

          {/* Color waves — ambient data flow */}
          <ColorWave delay={0} top="20%" color={colors.blue} />
          <ColorWave delay={2} top="40%" color={colors.purple} />
          <ColorWave delay={1} top="60%" color={colors.emerald} />
          <ColorWave delay={3} top="80%" color={colors.amber} />

          <motion.div
            className={`absolute right-20 top-20`}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <GridIcon isDark={isDark} />
          </motion.div>

          <motion.div
            className={`absolute bottom-20 left-20 ${isDark ? "text-gray-600" : "text-gray-300"}`}
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          >
            <div className={`h-24 w-24 rounded-sm border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
          </motion.div>

          <motion.div
            className="absolute left-40 top-40"
            animate={{ rotate: 180, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
          >
            <div className={`h-16 w-16 rounded-full border-2 ${isDark ? "border-gray-600" : "border-gray-300"}`} />
          </motion.div>

          {/* Colorful animated neural threads */}
          <div className="absolute inset-0 overflow-hidden">
            <ColorfulThreadLine delay={0} top="15%" color={colors.blue} />
            <ColorfulThreadLine delay={1.5} top="30%" color={colors.purple} />
            <ColorfulThreadLine delay={0.8} top="45%" color={colors.pink} />
            <ColorfulThreadLine delay={2.2} top="60%" color={colors.cyan} />
            <ColorfulThreadLine delay={0.3} top="75%" color={colors.emerald} />
            <ColorfulThreadLine delay={1.8} top="90%" color={colors.amber} />
          </div>

          {/* Colored circuit nodes */}
          <ColoredCircuitNode top="25%" left="15%" delay={0} color={colors.blue} />
          <ColoredCircuitNode top="35%" left="85%" delay={1.2} color={colors.purple} />
          <ColoredCircuitNode top="70%" left="25%" delay={2.4} color={colors.pink} />
          <ColoredCircuitNode top="80%" left="75%" delay={0.6} color={colors.cyan} />
          <ColoredCircuitNode top="45%" left="45%" delay={1.8} color={colors.emerald} />
          <ColoredCircuitNode top="15%" left="65%" delay={3.0} color={colors.amber} />
          <ColoredCircuitNode top="55%" left="95%" delay={2.1} color={colors.blue} />
          <ColoredCircuitNode top="85%" left="5%" delay={0.9} color={colors.purple} />

          {/* Additional faint connection lines with color tint */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, ${colors.blue}40 0.5px, transparent 0.5px)`,
              backgroundSize: "60px 60px",
              opacity: 0.2,
            }}
          />
        </div>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} /> {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`relative w-full max-w-2xl rounded-2xl shadow-2xl ${isDark ? "bg-gray-900" : "bg-white"} ${
            isMinimized ? "h-auto" : "max-h-[80vh]"
          }`}
        >
          {/* Header */}
          <div className={`border-b px-6 py-4 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{<stepInfo_data.icon isDark={isDark} />}</div>
                <div>
                  <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {stepInfo_data.title}
                  </h2>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stepInfo_data.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className={`rounded-lg p-2 transition-colors ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                >
                  <ArrowLeft
                    className={`h-4 w-4 transform transition-transform ${isMinimized ? "rotate-90" : ""} ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                </button>
                <button
                  onClick={onClose}
                  className={`rounded-lg p-2 transition-colors ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                >
                  <X className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-600"}`} />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Setup Progress</span>
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>{Math.round(progress)}%</span>
              </div>
              <div className={`h-2 overflow-hidden rounded-full ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {!isMinimized && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="overflow-y-auto p-6"
                style={{ maxHeight: "calc(80vh - 200px)" }}
              >
                {renderStepContent()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer - Factory Status */}
          {!isMinimized && (
            <div className={`border-t px-6 py-4 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${capabilities.canMonitor ? "bg-green-500" : "bg-gray-400"}`} />
                  <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Factory Status:{" "}
                    {capabilities.canIntegrate
                      ? "Fully Operational"
                      : capabilities.canCollaborate
                      ? "Collaboration Ready"
                      : capabilities.canExecute
                      ? "Execution Ready"
                      : "Monitoring"}
                  </span>
                </div>
                <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>{currentStep}</div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
