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
  card: {
    dark: "#1A1A1A",
    light: "#FFFFFF",
  },
}

export interface PersonaConfig {
  id?: string
  personaName: string
  tone: number
  principles: string[]
  boundaries: string[]
  updatedBy: string
  updatedAt?: string
  status?: "Active" | "Draft"
}

export const toneOptions = [
  { value: 0, label: "Professional", description: "Formal and business-oriented" },
  { value: 1, label: "Friendly", description: "Warm and approachable" },
  { value: 2, label: "Casual", description: "Relaxed and conversational" },
  { value: 3, label: "Technical", description: "Precise and detailed" },
  { value: 4, label: "Enthusiastic", description: "Energetic and engaging" },
]

export const slideInRight = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .animate-slide-in-right {
    animation: slideInRight 0.3s ease-out forwards;
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
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
`
