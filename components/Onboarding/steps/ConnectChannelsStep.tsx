"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useOnboarding } from "contexts/OnboardingContext"
import { useTheme } from "contexts/ThemeContext"
import { Link, Check, X } from "lucide-react"
// Brand icon components for each platform
const SlackIcon = () => <img src="/slack.png" alt="Slack" width="30" height="30" />

const TeamsIcon = () => <img src="/teams-icon.png" alt="Teams" width="30" height="30" />

const WhatsAppIcon = () => <img src="/whatsapp.png" alt="Whatsapp" width="30" height="30" />

const TelegramIcon = () => <img src="/telegram.png" alt="Telegram" width="30" height="30" />

const DiscordIcon = () => <img src="/discord.png" alt="Discord" width="30" height="30" />

const EmailIcon = () => <img src="/gmail.png" alt="GMail" width="30" height="30" />

const MeetIcon = () => <img src="/meet.png" alt="Google Meet" width="30" height="30" />

const ZoomIcon = () => <img src="/zoom.png" alt="Zoom" width="30" height="30" />

interface AvailableChannel {
  id: string
  name: string
  type: "slack" | "discord" | "teams" | "email" | "whatsapp" | "telegram" | "zoom" | "webex" | "meet"
  icon: React.ReactNode
  description: string
  platform: string
}

const availableChannels: AvailableChannel[] = [
  // Slack Channels
  {
    id: "slack-general",
    name: "#general",
    type: "slack",
    platform: "Slack",
    icon: <SlackIcon />,
    description: "Main team communication",
  },
  {
    id: "slack-dev",
    name: "#dev-team",
    type: "slack",
    platform: "Slack",
    icon: <SlackIcon />,
    description: "Development discussions",
  },
  {
    id: "slack-projects",
    name: "#projects",
    type: "slack",
    platform: "Slack",
    icon: <SlackIcon />,
    description: "Project updates and planning",
  },

  // Microsoft Teams
  {
    id: "teams-general",
    name: "General Team",
    type: "teams",
    platform: "Microsoft Teams",
    icon: <TeamsIcon />,
    description: "Main team collaboration space",
  },
  {
    id: "teams-projects",
    name: "Projects Hub",
    type: "teams",
    platform: "Microsoft Teams",
    icon: <TeamsIcon />,
    description: "Project management channel",
  },

  // WhatsApp
  {
    id: "whatsapp-team",
    name: "Team Chat",
    type: "whatsapp",
    platform: "WhatsApp",
    icon: <WhatsAppIcon />,
    description: "Mobile team communication",
  },
  {
    id: "whatsapp-projects",
    name: "Project Updates",
    type: "whatsapp",
    platform: "WhatsApp",
    icon: <WhatsAppIcon />,
    description: "Quick project updates",
  },

  // Telegram
  {
    id: "telegram-general",
    name: "General Chat",
    type: "telegram",
    platform: "Telegram",
    icon: <TelegramIcon />,
    description: "Team discussion group",
  },
  {
    id: "telegram-announcements",
    name: "Announcements",
    type: "telegram",
    platform: "Telegram",
    icon: <TelegramIcon />,
    description: "Important updates and news",
  },

  // Discord
  {
    id: "discord-general",
    name: "general",
    type: "discord",
    platform: "Discord",
    icon: <DiscordIcon />,
    description: "Community and team chat",
  },
  {
    id: "discord-voice",
    name: "voice-chat",
    type: "discord",
    platform: "Discord",
    icon: <DiscordIcon />,
    description: "Voice communication channel",
  },

  // Email Channels
  {
    id: "email-support",
    name: "support@company.com",
    type: "email",
    platform: "Email",
    icon: <EmailIcon />,
    description: "Customer support email",
  },
  {
    id: "email-info",
    name: "info@company.com",
    type: "email",
    platform: "Email",
    icon: <EmailIcon />,
    description: "General information email",
  },
  {
    id: "email-newsletter",
    name: "newsletter@company.com",
    type: "email",
    platform: "Email",
    icon: <EmailIcon />,
    description: "Newsletter and updates",
  },

  // Video Conferencing
  {
    id: "zoom-meetings",
    name: "Team Meetings",
    type: "zoom",
    platform: "Zoom",
    icon: <ZoomIcon />,
    description: "Regular team video calls",
  },

  {
    id: "meet-meetings",
    name: "Team Meetings",
    type: "meet",
    platform: "Google Meet",
    icon: <MeetIcon />,
    description: "Regular team video calls",
  },
]

const typeColors = {
  slack: "#4A154B",
  discord: "#5865F2",
  teams: "#0078D4",
  email: "#EA4335",
  whatsapp: "#25D366",
  telegram: "#0088CC",
  zoom: "#2D8CFF",
  webex: "#005BAC",
  meet: "#00897B",
}

export default function ConnectChannelsStep({ onComplete }: { onComplete: () => void }) {
  const { state, connectChannel, disconnectChannel } = useOnboarding()
  const { isDark } = useTheme()
  const [draggedChannel, setDraggedChannel] = useState<AvailableChannel | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleDragStart = (channel: AvailableChannel) => {
    setDraggedChannel(channel)
  }

  const handleDragEnd = () => {
    setDraggedChannel(null)
    setIsDraggingOver(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)

    if (draggedChannel) {
      connectChannel({
        id: draggedChannel.id,
        name: draggedChannel.name,
        type: draggedChannel.type,
        icon: draggedChannel.id,
        connected: true,
      })
    }
  }

  const handleDisconnect = (channelId: string) => {
    disconnectChannel(channelId)
  }

  const isChannelConnected = (channelId: string) => {
    return state.connectedChannels.some((c) => c.id === channelId)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h3 className={`mb-2 text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          Connect Your Communication Channels
        </h3>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Drag channels from the available list to the connected box to enable Factory integration.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Available Channels */}
        <div>
          <h4 className={`mb-3 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Available Channels</h4>
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {availableChannels.map((channel) => {
              const isConnected = isChannelConnected(channel.id)
              return (
                <motion.div
                  key={channel.id}
                  draggable={!isConnected}
                  onDragStart={() => !isConnected && handleDragStart(channel)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: isConnected ? 1 : 1.02 }}
                  whileDrag={{ scale: 0.95, opacity: 0.8 }}
                  className={`cursor-move rounded-lg border p-3 transition-all ${
                    isConnected
                      ? "cursor-not-allowed border-gray-300 bg-gray-100 opacity-50"
                      : isDark
                      ? "hover:bg-gray-750 border-gray-700 bg-gray-800 hover:border-gray-600"
                      : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex  items-center justify-center rounded-full text-white">{channel.icon}</div>
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{channel.name}</p>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {channel.platform} • {channel.description}
                        </p>
                      </div>
                    </div>

                    {isConnected ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Link className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Connected Channels - Drop Zone */}
        <div>
          <h4 className={`mb-3 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Connected Channels</h4>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`min-h-[200px] rounded-lg border-2 border-dashed p-4 transition-all ${
              isDraggingOver
                ? "border-blue-500 bg-blue-500/10"
                : isDark
                ? "border-gray-700 bg-gray-800/50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            {state.connectedChannels.length === 0 ? (
              <div className="py-8 text-center">
                <Link className={`mx-auto mb-3 h-12 w-12 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Drag channels here to connect them</p>
                <p className={`mt-1 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                  The Factory will monitor and learn from these channels
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {state.connectedChannels.map((channel) => {
                  const channelInfo = availableChannels.find((ac) => ac.id === channel.id)
                  return (
                    <motion.div
                      key={channel.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`rounded-lg border p-3 ${
                        isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: typeColors[channel.type] }}
                          >
                            {channelInfo?.icon || <Link className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{channel.name}</p>
                            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              {channelInfo?.platform || "Connected"} • {channelInfo?.description || "Connected channel"}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDisconnect(channel.id)}
                          className={`rounded p-1 transition-colors ${
                            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                          }`}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      {state.connectedChannels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-gray-200 pt-4 dark:border-gray-700"
        >
          <button
            onClick={onComplete}
            className={`w-full transform rounded-lg py-3 font-medium transition-all hover:scale-105 ${
              isDark ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Continue to Configure Members
          </button>
          <p className={`mt-2 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {state.connectedChannels.length} channel{state.connectedChannels.length !== 1 ? "s" : ""} connected
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
