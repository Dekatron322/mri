// Sound utility for UI interactions
export class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext()
  }

  private initAudioContext() {
    if (typeof window !== "undefined" && !this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  private playSound(frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.1) {
    if (!this.enabled || !this.audioContext) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.warn("Error playing sound:", error)
    }
  }

  // Input field focus sound - gentle, inviting
  playFocusSound() {
    this.playSound(600, 0.15, "triangle", 0.08)
  }

  // Button click sound - sharp, responsive
  playClickSound() {
    this.playSound(800, 0.1, "sine", 0.12)
  }

  // Dropdown selection sound - satisfying selection sound
  playSelectSound() {
    // Two-tone selection sound
    this.playSound(440, 0.08, "square", 0.1)
    setTimeout(() => this.playSound(550, 0.08, "square", 0.08), 50)
  }

  // Dropdown open/close sound - subtle whoosh
  playDropdownToggleSound() {
    this.playSound(300, 0.2, "sine", 0.05)
  }

  // Text input typing sound - very subtle
  playTypingSound() {
    this.playSound(1000, 0.02, "sine", 0.02)
  }

  // Success sound - ascending chime
  playSuccessSound() {
    this.playSound(523, 0.1, "sine", 0.15)
    setTimeout(() => this.playSound(659, 0.1, "sine", 0.12), 50)
    setTimeout(() => this.playSound(784, 0.15, "sine", 0.1), 100)
  }

  // Error sound - descending buzz
  playErrorSound() {
    this.playSound(200, 0.2, "sawtooth", 0.1)
    setTimeout(() => this.playSound(150, 0.15, "sawtooth", 0.08), 100)
  }

  // Navigation sound - soft transition
  playNavigationSound() {
    this.playSound(400, 0.12, "triangle", 0.08)
  }

  // Hover sound - very subtle
  playHoverSound() {
    this.playSound(1200, 0.03, "sine", 0.03)
  }

  // Toggle sounds on/off
  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  // Check if sounds are enabled
  isEnabled() {
    return this.enabled
  }
}

// Create singleton instance
export const soundManager = new SoundManager()

// Hook for React components
export const useSound = () => {
  return {
    playClick: () => soundManager.playClickSound(),
    playFocus: () => soundManager.playFocusSound(),
    playSelect: () => soundManager.playSelectSound(),
    playDropdownToggle: () => soundManager.playDropdownToggleSound(),
    playTyping: () => soundManager.playTypingSound(),
    playSuccess: () => soundManager.playSuccessSound(),
    playError: () => soundManager.playErrorSound(),
    playNavigation: () => soundManager.playNavigationSound(),
    playHover: () => soundManager.playHoverSound(),
    toggle: () => soundManager.toggle(),
    isEnabled: () => soundManager.isEnabled(),
  }
}
