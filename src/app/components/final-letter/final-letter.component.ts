import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { AudioService } from "../../services/audio.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-final-letter",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="final-letter-container" [@fadeIn]>
      <div class="final-letter-content">
        <h2 class="final-letter-title">Carta Final</h2>
        <div class="final-letter-text" appTypewriter [text]="finalLetterText" [onComplete]="onTypingComplete.bind(this)"></div>
      </div>
      
      <div class="celebration" *ngIf="showCelebration">
        <div class="hearts"></div>
        <div class="fireworks"></div>
        <div class="confetti"></div>
      </div>
      
      <div class="thank-you" *ngIf="showThankYou">
        <h2>Gracias por estar en mi vida</h2>
        <p>Te amo, Nat ❤️</p>
      </div>
    </div>
  `,
  styles: [
    `
    .final-letter-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    
    .final-letter-content {
      background-color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      border: 1px solid #333;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
      max-width: 800px;
      width: 100%;
      margin-bottom: 30px;
      z-index: 2;
    }
    
    .final-letter-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 20px;
      text-decoration: underline;
    }
    
    .final-letter-text {
      font-size: 1.2rem;
      line-height: 1.8;
      text-align: justify;
      white-space: pre-line;
    }
    
    .thank-you {
      text-align: center;
      margin-top: 30px;
      opacity: 0;
      animation: fadeIn 2s forwards;
      animation-delay: 1s;
      z-index: 2;
    }
    
    .thank-you h2 {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    
    .thank-you p {
      font-size: 1.5rem;
    }
    
    /* Celebration animations */
    .celebration {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .hearts {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .hearts::before {
      content: '❤️';
      position: absolute;
      font-size: 20px;
      animation: hearts 3s infinite;
    }
    
    .hearts::after {
      content: '❤️';
      position: absolute;
      left: 10%;
      font-size: 25px;
      animation: hearts 2.5s infinite;
      animation-delay: 0.5s;
    }
    
    .fireworks {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .confetti {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    @keyframes hearts {
      0% {
        top: 100%;
        opacity: 1;
        transform: translateX(calc(random(100) * 1%)) scale(1);
      }
      100% {
        top: -10%;
        opacity: 0;
        transform: translateX(calc(random(100) * 1%)) scale(0.5);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  ],
  animations: [
    trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("1s ease-in", style({ opacity: 1 }))])]),
  ],
})
export class FinalLetterComponent implements OnInit {
  finalLetterText = `Wow… No tienes idea lo que me tardó hacer esto, le metí cada esfuerzo que tú me diste. Gracias, gracias por ser la razón de que mi vida ahora tenga una razón, gracias por hacerme sonreir, gracias por darme un sentido, gracias por ser tú, gracias. No tienes idea las gracias que debo darte. No me había enamorado tanto de una persona para llegar a hacer ésto. Te amo demasiado Natalia, tqm mi niña, nunca lo olvides. TE AMOOO`

  showCelebration = false
  showThankYou = false

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    // Crear múltiples corazones
    this.createHearts()
    // Crear confeti
    this.createConfetti()
  }

  onTypingComplete() {
    this.showCelebration = true
    this.audioService.playCelebrationSound()

    setTimeout(() => {
      this.showThankYou = true
    }, 2000)
  }

  createHearts() {
    const heartsContainer = document.querySelector(".hearts")
    if (!heartsContainer) return

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("div")
      heart.innerHTML = "❤️"
      heart.style.position = "absolute"
      heart.style.left = `${Math.random() * 100}%`
      heart.style.top = "100%"
      heart.style.fontSize = `${Math.random() * 15 + 15}px`
      heart.style.animation = `hearts ${Math.random() * 3 + 2}s infinite`
      heart.style.animationDelay = `${Math.random() * 5}s`
      heartsContainer.appendChild(heart)
    }
  }

  createConfetti() {
    const confettiContainer = document.querySelector(".confetti")
    if (!confettiContainer) return

    const colors = ["#e76f51", "#f4a261", "#e9c46a", "#2a9d8f", "#264653"]

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      confetti.style.position = "absolute"
      confetti.style.left = `${Math.random() * 100}%`
      confetti.style.width = `${Math.random() * 10 + 5}px`
      confetti.style.height = `${Math.random() * 10 + 5}px`
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`
      confetti.style.top = "-10px"
      confetti.style.opacity = "1"
      confetti.style.animation = `confetti ${Math.random() * 3 + 2}s linear infinite`
      confetti.style.animationDelay = `${Math.random() * 5}s`
      confettiContainer.appendChild(confetti)
    }

    // Añadir keyframes para la animación de confeti
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes confetti {
        0% {
          top: -10px;
          opacity: 1;
          transform: translateX(0) rotate(0deg);
        }
        100% {
          top: 100%;
          opacity: 0.3;
          transform: translateX(calc(${Math.random() * 100 - 50}px)) rotate(${Math.random() * 360}deg);
        }
      }
    `
    document.head.appendChild(style)
  }
}
