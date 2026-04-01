"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  avatar?: string
}

export interface Channel {
  id: string
  name: string
  type: "slack" | "discord" | "teams" | "email" | "whatsapp" | "telegram" | "zoom" | "webex" | "meet"
  icon: string
  connected: boolean
}

export interface MemberChannelAssignment {
  memberId: string
  channelId: string
  permissions: ("read" | "write" | "admin")[]
}

export type OnboardingStep =
  | "email_verified"
  | "team_members"
  | "connect_channels"
  | "configure_members"
  | "business_profile"
  | "completed"

export interface BusinessProfile {
  companyName: string
  industry: string
  objectives: string[]
  factoryObjective: string
  standupFrequency: "daily" | "weekly" | "biweekly" | "custom"
  standupCustomDays?: number
  persona: string
  teamSize: string
  primaryGoals: string[]
}

export interface OnboardingState {
  currentStep: OnboardingStep
  isCompleted: boolean
  emailVerified: boolean
  teamMembers: TeamMember[]
  connectedChannels: Channel[]
  memberAssignments: MemberChannelAssignment[]
  businessProfile: BusinessProfile
  factoryCapabilities: {
    canMonitor: boolean
    canExecute: boolean
    canCollaborate: boolean
    canIntegrate: boolean
  }
}

interface OnboardingContextType {
  state: OnboardingState
  updateStep: (step: OnboardingStep) => void
  addTeamMember: (member: Omit<TeamMember, "id">) => void
  removeTeamMember: (id: string) => void
  connectChannel: (channel: Channel) => void
  disconnectChannel: (id: string) => void
  assignMemberToChannel: (assignment: MemberChannelAssignment) => void
  removeMemberAssignment: (memberId: string, channelId: string) => void
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void
  getStepProgress: () => number
  getFactoryCapabilities: () => OnboardingState["factoryCapabilities"]
  isStepUnlocked: (step: OnboardingStep) => boolean
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const initialState: OnboardingState = {
  currentStep: "email_verified",
  isCompleted: false,
  emailVerified: false,
  teamMembers: [],
  connectedChannels: [],
  memberAssignments: [],
  businessProfile: {
    companyName: "",
    industry: "",
    objectives: [],
    factoryObjective: "",
    standupFrequency: "weekly",
    persona: "",
    teamSize: "",
    primaryGoals: [],
  },
  factoryCapabilities: {
    canMonitor: false,
    canExecute: false,
    canCollaborate: false,
    canIntegrate: false,
  },
}

const stepOrder: OnboardingStep[] = [
  "email_verified",
  "team_members",
  "connect_channels",
  "configure_members",
  "business_profile",
  "completed",
]

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState)

  // Update factory capabilities based on current state
  useEffect(() => {
    const capabilities = {
      canMonitor: state.emailVerified,
      canExecute: state.emailVerified && state.teamMembers.length > 0,
      canCollaborate: state.emailVerified && state.teamMembers.length > 0 && state.connectedChannels.length > 0,
      canIntegrate:
        state.emailVerified &&
        state.teamMembers.length > 0 &&
        state.connectedChannels.length > 0 &&
        state.memberAssignments.length > 0 &&
        state.businessProfile.companyName !== "",
    }

    setState((prev) => ({
      ...prev,
      factoryCapabilities: capabilities,
      isCompleted: prev.currentStep === "completed",
    }))
  }, [
    state.emailVerified,
    state.teamMembers.length,
    state.connectedChannels.length,
    state.memberAssignments.length,
    state.businessProfile.companyName,
  ])

  const updateStep = (step: OnboardingStep) => {
    setState((prev) => {
      const newState = { ...prev, currentStep: step }

      // Auto-verify email if moving past that step
      if (step !== "email_verified" && !prev.emailVerified) {
        newState.emailVerified = true
      }

      // Mark as completed if reaching final step
      if (step === "completed") {
        newState.isCompleted = true
      }

      return newState
    })
  }

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...member,
      id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    setState((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember],
    }))
  }

  const removeTeamMember = (id: string) => {
    setState((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== id),
      memberAssignments: prev.memberAssignments.filter((ma) => ma.memberId !== id),
    }))
  }

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setState((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }))
  }

  const connectChannel = (channel: Channel) => {
    setState((prev) => ({
      ...prev,
      connectedChannels: [...prev.connectedChannels, { ...channel, connected: true }],
    }))
  }

  const disconnectChannel = (channelId: string) => {
    setState((prev) => ({
      ...prev,
      connectedChannels: prev.connectedChannels.filter((c) => c.id !== channelId),
      memberAssignments: prev.memberAssignments.filter((ma) => ma.channelId !== channelId),
    }))
  }

  const assignMemberToChannel = (assignment: MemberChannelAssignment) => {
    setState((prev) => {
      // Remove existing assignment for this member-channel pair
      const filtered = prev.memberAssignments.filter(
        (ma) => !(ma.memberId === assignment.memberId && ma.channelId === assignment.channelId)
      )

      return {
        ...prev,
        memberAssignments: [...filtered, assignment],
      }
    })
  }

  const removeMemberAssignment = (memberId: string, channelId: string) => {
    setState((prev) => ({
      ...prev,
      memberAssignments: prev.memberAssignments.filter(
        (assignment) => !(assignment.memberId === memberId && assignment.channelId === channelId)
      ),
    }))
  }

  const updateBusinessProfile = (profile: Partial<BusinessProfile>) => {
    setState((prev) => ({
      ...prev,
      businessProfile: {
        ...prev.businessProfile,
        ...profile,
      },
    }))
  }

  const getStepProgress = (): number => {
    const currentIndex = stepOrder.indexOf(state.currentStep)
    return ((currentIndex + 1) / stepOrder.length) * 100
  }

  const getFactoryCapabilities = () => state.factoryCapabilities

  const isStepUnlocked = (step: OnboardingStep): boolean => {
    const stepIndex = stepOrder.indexOf(step)
    const currentIndex = stepOrder.indexOf(state.currentStep)

    // Email verification is always unlocked as the first step
    if (step === "email_verified") return true

    // All steps are unlocked - factory degrades gracefully
    return true
  }

  const resetOnboarding = () => {
    setState(initialState)
  }

  return (
    <OnboardingContext.Provider
      value={{
        state,
        updateStep,
        addTeamMember,
        removeTeamMember,
        connectChannel,
        disconnectChannel,
        assignMemberToChannel,
        removeMemberAssignment,
        updateBusinessProfile,
        getStepProgress,
        getFactoryCapabilities,
        isStepUnlocked,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
