import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class AudioService {
  private typewriterSound: HTMLAudioElement | null = null
  private backgroundMusic: HTMLAudioElement | null = null
  private celebrationSound: HTMLAudioElement | null = null
  private isMuted = false

  constructor() {}

  preloadSounds() {
    if (typeof Audio !== "undefined") {
      this.typewriterSound = new Audio("/assets/sounds/typewriter-key.mp3")
      this.backgroundMusic = new Audio("/assets/sounds/background-music.mp3")
      this.celebrationSound = new Audio("/assets/sounds/celebration.mp3")

      if (this.backgroundMusic) {
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = 0.3
      }
    }
  }

  playTypewriterSound() {
    if (this.isMuted || !this.typewriterSound) return

    // Clonar el sonido para permitir múltiples reproducciones simultáneas
    const sound = this.typewriterSound.cloneNode() as HTMLAudioElement
    sound.volume = 0.5
    sound.play().catch((e) => console.error("Error playing typewriter sound:", e))
  }

  playBackgroundMusic() {
    if (this.isMuted || !this.backgroundMusic) return

    this.backgroundMusic.play().catch((e) => console.error("Error playing background music:", e))
  }

  playCelebrationSound() {
    if (this.isMuted || !this.celebrationSound) return

    this.celebrationSound.play().catch((e) => console.error("Error playing celebration sound:", e))
  }

  toggleMute() {
    this.isMuted = !this.isMuted

    if (this.backgroundMusic) {
      if (this.isMuted) {
        this.backgroundMusic.pause()
      } else {
        this.backgroundMusic.play().catch((e) => console.error("Error playing background music:", e))
      }
    }

    return this.isMuted
  }
}
