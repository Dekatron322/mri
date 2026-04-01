// app/providers.tsx
"use client"

import { store } from "lib/redux/store"
import { Provider } from "react-redux"
import Modal from "react-modal"
import { ThemeProvider } from "contexts/ThemeContext"
import { OnboardingProvider } from "contexts/OnboardingContext"

// Set the app element for accessibility for all modals
if (typeof window !== "undefined") {
  Modal.setAppElement(document.body)
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <OnboardingProvider>{children}</OnboardingProvider>
      </ThemeProvider>
    </Provider>
  )
}
