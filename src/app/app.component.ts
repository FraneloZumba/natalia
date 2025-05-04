import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { WelcomeComponent } from "./components/welcome/welcome.component"
import { PoemComponent } from "./components/poem/poem.component"
import { AboutMeComponent } from "./components/about-me/about-me.component"
import { AboutHerComponent } from "./components/about-her/about-her.component"
import { FuturePlansComponent } from "./components/future-plans/future-plans.component"
import { CompatibilityComponent } from "./components/compatibility/compatibility.component"
import { ProposalComponent } from "./components/proposal/proposal.component"
import { FinalLetterComponent } from "./components/final-letter/final-letter.component"
import { AudioService } from "./services/audio.service"
import { StateService } from "./services/state.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    WelcomeComponent,
    PoemComponent,
    AboutMeComponent,
    AboutHerComponent,
    FuturePlansComponent,
    CompatibilityComponent,
    ProposalComponent,
    FinalLetterComponent,
  ],
  template: `
    <div class="app-container">
      <ng-container [ngSwitch]="stateService.currentScreen">
        <app-welcome *ngSwitchCase="'welcome'"></app-welcome>
        <app-poem *ngSwitchCase="'poem'"></app-poem>
        <app-about-me *ngSwitchCase="'about-me'"></app-about-me>
        <app-about-her *ngSwitchCase="'about-her'"></app-about-her>
        <app-future-plans *ngSwitchCase="'future-plans'"></app-future-plans>
        <app-compatibility *ngSwitchCase="'compatibility'"></app-compatibility>
        <app-proposal *ngSwitchCase="'proposal'"></app-proposal>
        <app-final-letter *ngSwitchCase="'final-letter'"></app-final-letter>
      </ng-container>
    </div>
  `,
  styles: [
    `
    .app-container {
      width: 100%;
      min-height: 100vh;
      background-image: url('/assets/images/paper-texture.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      font-family: 'Special Elite', cursive;
      color: #333;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    public stateService: StateService,
    private audioService: AudioService,
  ) {}

  ngOnInit() {
    // Precargar sonidos
    this.audioService.preloadSounds()

    // Verificar si ya ha respondido
    const hasResponded = localStorage.getItem("hasResponded")
    const saidYes = localStorage.getItem("saidYes")

    if (hasResponded && saidYes === "true") {
      this.stateService.setScreen("final-letter")
    }
  }
}
