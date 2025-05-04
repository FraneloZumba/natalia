import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { StateService } from "../../services/state.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-about-me",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="about-me-container" [@fadeIn]>
      <div class="about-me-content">
        <h2 class="about-me-title">Sobre Mí</h2>
        <div class="about-me-text" appTypewriter [text]="aboutMeText" [onComplete]="onTypingComplete.bind(this)"></div>
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
    .about-me-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .about-me-content {
      background-color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      border: 1px solid #333;
      margin-bottom: 30px;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
    }
    
    .about-me-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 20px;
      text-decoration: underline;
    }
    
    .about-me-text {
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
export class AboutMeComponent {
  aboutMeText = `Ok hagamos esto una última vez. Mi nombre es Fran Zumba. Fui mordido por una araña radioactiva y desde hace 17 años soy el único y e inigualable Spider-man. Seguro ya sabes lo demás. Salvé un montón de gente, salve la ciudad , pero de eso no se habla. Soy fotógrafo, cineasta, músico, poeta, programador, amo pasar tiempo con mis hermanos, con mis amig@s y en general,a pesar de todos los problemas que he tenido, sigo amando ser Spider-man... ¿y quién no lo haría? Sin importar cuántas veces me golpeen, yo siempre encuentro la forma de cómo levantarme. Hasta que… sin previo aviso, en medio de toda mi soledad, mis aventuras y mi tristeza, apareciste tú.`

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
