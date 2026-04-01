export const cortifactColors = {
  bg: {
    dark: "#0D0D0D",
    light: "#FAFAFA",
  },
  sidebar: {
    dark: "#1A1A1A",
    light: "#F5F5F5",
  },
  accent: "#D97757",
  text: {
    dark: "#E5E5E5",
    light: "#1A1A1A",
    muted: {
      dark: "#6B6B6B",
      light: "#737373",
    },
  },
  border: {
    dark: "#2A2A2A",
    light: "#E5E5E5",
  },
  danger: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
}

export type Role = "Owner" | "Admin" | "Member"
export type Status = "Active" | "Pending"

export interface Member {
  id: string
  name: string
  fullName: string
  email: string
  role: Role
  status: Status
  joinedAt: string
  lastActive?: string
  avatar?: string
  department?: string
  authorityLevel?: "Low" | "Medium" | "High"
  preferredChannel?: "Email" | "Slack" | "Teams" | "Discord"
  specialization?: string
}

export const roleConfig: Record<Role, { label: string; description: string; color: string }> = {
  Owner: { label: "Owner", description: "Full access to all settings and billing", color: cortifactColors.accent },
  Admin: { label: "Admin", description: "Can manage members and most settings", color: "#3B82F6" },
  Member: { label: "Member", description: "Can use the platform with limited settings", color: "#6B7280" },
}

export const slideInRight = `
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
`

export const fadeIn = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function getAvatarColor(name: string) {
  const colors = ["#D97757", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}
