import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { StateService } from "../../services/state.service"
import { AudioService } from "../../services/audio.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-welcome",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="welcome-container" [@fadeIn]>
      <h1 class="title" appTypewriter [text]="welcomeText" [onComplete]="onTypingComplete.bind(this)"></h1>
      <button 
        class="vintage-button" 
        [class.visible]="showButton" 
        (click)="onStart()"
      >
        Iniciar
      </button>
    </div>
  `,
  styles: [
    `
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      text-align: center;
      padding: 20px;
    }
    
    .title {
      font-size: 2.5rem;
      margin-bottom: 40px;
      min-height: 60px;
    }
    
    .vintage-button {
      background-color: #f8f4e3;
      border: 2px solid #333;
      color: #333;
      padding: 12px 30px;
      font-family: 'Special Elite', cursive;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 3px 3px 0 #333;
      opacity: 0;
      transform: translateY(20px);
    }
    
    .vintage-button:hover {
      background-color: #e8e4d3;
      box-shadow: 1px 1px 0 #333;
      transform: translate(2px, 2px);
    }
    
    .vintage-button.visible {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
  `,
  ],
  animations: [
    trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("1s ease-in", style({ opacity: 1 }))])]),
  ],
})
export class WelcomeComponent implements OnInit {
  welcomeText = "Hola, bienvenida Nat ❤️‍🩹"
  showButton = false

  constructor(
    private stateService: StateService,
    private audioService: AudioService,
  ) {}

  ngOnInit() {
    this.audioService.playBackgroundMusic()
  }

  onTypingComplete() {
    setTimeout(() => {
      this.showButton = true
    }, 500)
  }

  onStart() {
    this.stateService.nextScreen()
  }
}
