import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { StateService } from "../../services/state.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-poem",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="poem-container" [@fadeIn]>
      <div class="poem-content">
        <h2 class="poem-title">Para Ti</h2>
        <div class="poem-text" appTypewriter [text]="poemText" [onComplete]="onTypingComplete.bind(this)"></div>
      </div>
      <button 
        class="vintage-button" 
        [class.visible]="showButton" 
        (click)="onContinue()"
      >
        Siguiente
      </button>
    </div>
  `,
  styles: [
    `
    .poem-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .poem-content {
      background-color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      border: 1px solid #333;
      margin-bottom: 30px;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
    }
    
    .poem-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 20px;
      text-decoration: underline;
    }
    
    .poem-text {
      font-size: 1.2rem;
      line-height: 1.8;
      text-align: center;
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
export class PoemComponent {
  poemText = `¿Sabes por qué duermo
con tus ojos café clavados
en la pupila de mis sueños?

Porque tu voz es un eco
que desordena mi pecho,
es una canción que me enseña
a latir sin miedo.

¿Cómo no perderme
en tu risa de atardecer,
si cada risa tuya
es un faro que alumbra mi vida?

Te amo en mil trozos:
en la curva de tus pestañas,
en el color de tu ojos,
en el temblor de mi voz
cuando pronuncio tu nombre.

Y aunque no tenga una máquina
ni poderes de corrección,
querría retroceder al instante
justo antes de conocerte,
para atraparte otra vez
y decirte sin temblar:

Eres todo lo que me falta,
eres mi verso inacabado,
mi remanso de calma,
mi inevitable querer. ❤️`

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
