import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { StateService } from "../../services/state.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-about-her",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="about-her-container" [@fadeIn]>
      <div class="about-her-content">
        <h2 class="about-her-title">Sobre Ti, Nat</h2>
        <div class="about-her-text" appTypewriter [text]="aboutHerText" [onComplete]="onTypingComplete.bind(this)"></div>
      </div>
      <button 
        class="vintage-button" 
        [class.visible]="showButton" 
        (click)="onContinue()"
      >
        Continuar
      </button>
    </div>
  `,
  styles: [
    `
    .about-her-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .about-her-content {
      background-color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      border: 1px solid #333;
      margin-bottom: 30px;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
    }
    
    .about-her-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 20px;
      text-decoration: underline;
    }
    
    .about-her-text {
      font-size: 1.2rem;
      line-height: 1.8;
      text-align: justify;
      white-space: pre-line;
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
export class AboutHerComponent {
  aboutHerText = `Desde el primer momento en que te vi, supe que había algo especial en ti. Tu belleza no es solo física, aunque tus ojos tienen un color que me hipnotiza y tu sonrisa ilumina cualquier habitación. Lo que realmente me cautivó fue tu espíritu.

A través de nuestras conversaciones, he podido vislumbrar fragmentos de tu infancia. Aunque no puedo mencionar todos los detalles aquí, puedo decir que me asombra cómo, a pesar de las dificultades que has enfrentado, sigues siendo una persona tan radiante y hermosa por dentro.

Tu risa es contagiosa, tu voz es música para mis oídos, y tu forma de ver el mundo me inspira cada día. Cuando estoy contigo, siento LA MEJOR SENSACIÓN DE LA VIDA. Nunca antes había sentido algo así por alguien, y es por eso que me he atrevido a crear esto para ti.

Cada detalle tuyo, desde la forma en que hablas hasta tus pequeños gestos, me ha enamorado profundamente. Eres una persona extraordinaria, Nat, y me siento increíblemente afortunado de haberte conocido.`

  showButton = false

  constructor(private stateService: StateService) {}

  onTypingComplete() {
    setTimeout(() => {
      this.showButton = true
    }, 1000)
  }

  onContinue() {
    this.stateService.nextScreen()
  }
}
