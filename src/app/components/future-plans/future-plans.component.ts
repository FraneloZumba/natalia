import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { StateService } from "../../services/state.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-future-plans",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="future-plans-container" [@fadeIn]>
      <div class="future-plans-content">
        <h2 class="future-plans-title">Nuestro Futuro Juntos</h2>
        <div class="future-plans-text" appTypewriter [text]="futurePlansText" [onComplete]="onTypingComplete.bind(this)"></div>
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
    .future-plans-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .future-plans-content {
      background-color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      border: 1px solid #333;
      margin-bottom: 30px;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
    }
    
    .future-plans-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 20px;
      text-decoration: underline;
    }
    
    .future-plans-text {
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
export class FuturePlansComponent {
  futurePlansText = `Hay tantas cosas que quiero vivir contigo...

Imagínate unos viajes alrededor del mundo, descubriendo juntos nuevos lugares, culturas y sabores. Desde las playas más hermosas hasta las ciudades más tranquilas, quiero crear recuerdos contigo en cada rincón de este fucking planeta.

Claro que nuestros estudios es lo primordial. Quiero que ambos alcancemos nuestras metas y sueños para llegar a ser profesionales, estando juntos en cada paso del camino. Después, construir carreras exitosas que nos permitan tener la estabilidad que merecemos.

Imagínate tener nuestro propio hogar, un espacio que refleje nuestra personalidad y amor. Y quizás, con el tiempo, darte una pequeña mini tú o un mini yo.

Pero antes de eso tenemos que hacer muchísimas cosas: explorar nuevas cafeterías juntos (porque ambos amamos el café), compartir libros, música, películas de Marvel, y simplemente disfrutar de la compañía del otro en los momentos cotidianos que hacen que la vida sea especial.

Contigo, el futuro no es solo un plan, es una promesa de felicidad a largo plazo que quiero para ambos.`

  showButton = false

  constructor(private stateService: StateService) { }

  onTypingComplete() {
    setTimeout(() => {
      this.showButton = true
    }, 1000)
  }

  onContinue() {
    this.stateService.nextScreen()
  }
}
