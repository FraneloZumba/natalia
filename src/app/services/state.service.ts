import { Injectable } from "@angular/core"

export type ScreenType =
  | "welcome"
  | "poem"
  | "about-me"
  | "about-her"
  | "future-plans"
  | "compatibility"
  | "proposal"
  | "final-letter"

@Injectable({
  providedIn: "root",
})
export class StateService {
  currentScreen: ScreenType = "welcome"

  constructor() {
    // Verificar si ya ha respondido
    const hasResponded = localStorage.getItem("hasResponded")
    const saidYes = localStorage.getItem("saidYes")

    if (hasResponded && saidYes === "true") {
      this.currentScreen = "final-letter"
    }
  }

  setScreen(screen: ScreenType) {
    this.currentScreen = screen
  }

  nextScreen() {
    const screens: ScreenType[] = [
      "welcome",
      "poem",
      "about-me",
      "about-her",
      "future-plans",
      "compatibility",
      "proposal",
      "final-letter",
    ]

    const currentIndex = screens.indexOf(this.currentScreen)
    if (currentIndex < screens.length - 1) {
      this.currentScreen = screens[currentIndex + 1]
    }
  }

  saveResponse(saidYes: boolean) {
    localStorage.setItem("hasResponded", "true")
    localStorage.setItem("saidYes", saidYes ? "true" : "false")
  }
}
