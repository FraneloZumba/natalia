import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { AudioService } from "../../services/audio.service"

@Component({
  selector: "app-final-letter",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="final-letter-container">
      <div class="final-letter-content">
        <h2 class="final-letter-title">SIIII DIJISTE QUE SÍ</h2>
        <div class="final-letter-text" appTypewriter [text]="finalLetterText" [onComplete]="onTypingComplete.bind(this)"></div>
      </div>
      
      <!-- Efectos de celebración -->
      <div class="celebration" *ngIf="showCelebration">
        <!-- Corazones -->
        <div class="hearts-container">
          <div class="heart" *ngFor="let i of [].constructor(30)"></div>
        </div>
        
        <!-- Fuegos artificiales -->
        <div class="fireworks-container">
          <div class="firework" *ngFor="let i of [].constructor(10)"></div>
        </div>
        
        <!-- Confeti -->
        <div class="confetti-container">
          <div class="confetti" *ngFor="let i of [].constructor(100)"></div>
        </div>
      </div>
      
      <div class="thank-you" *ngIf="showThankYou">
        <h2>Gracias por estar en mi vida</h2>
        <p>Te amo, Nat ❤️</p>
        
        <button class="close-button" (click)="closeApp()">
          Cerrar
        </button>
      </div>
      
      <!-- Popup de cierre -->
      <div class="close-popup" *ngIf="showClosePopup">
        <div class="popup-content">
          <h3>Ahora ya sabes qué hacer</h3>
          <p>Ven y bésame xfavor</p>
          <button class="final-button" (click)="finalClose()">Entendido</button>
        </div>
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
      animation: fadeIn 1s ease-in;
    }
    
    .final-letter-content {
      background-color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      border: 1px solid #333;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
      max-width: 800px;
      width: 95%;
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
      margin-bottom: 20px;
    }
    
    .close-button {
      background-color: #f8f4e3;
      border: 2px solid #333;
      color: #333;
      padding: 12px 30px;
      font-family: 'Special Elite', cursive;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 3px 3px 0 #333;
      margin-top: 20px;
    }
    
    .close-button:hover {
      background-color: #e8e4d3;
      box-shadow: 1px 1px 0 #333;
      transform: translate(2px, 2px);
    }
    
    /* Popup de cierre */
    .close-popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.5s ease-in;
    }
    
    .popup-content {
      background-color: #f8f4e3;
      padding: 30px;
      border: 2px solid #333;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.3);
      text-align: center;
      max-width: 90%;
      width: 400px;
    }
    
    .popup-content h3 {
      font-size: 1.8rem;
      margin-bottom: 15px;
    }
    
    .popup-content p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    
    .final-button {
      background-color: #2a9d8f;
      border: 2px solid #333;
      color: white;
      padding: 10px 25px;
      font-family: 'Special Elite', cursive;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 3px 3px 0 #333;
    }
    
    .final-button:hover {
      background-color: #218a7e;
      box-shadow: 1px 1px 0 #333;
      transform: translate(2px, 2px);
    }
    
    /* Celebration animations */
    .celebration {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    
    /* Corazones */
    .hearts-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    
    .heart {
      position: absolute;
      font-size: 20px;
      color: red;
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff0000'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0;
      animation: floatHeart 4s ease-in infinite;
    }
    
    /* Fuegos artificiales */
    .fireworks-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    
    .firework {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      opacity: 0;
      transform-origin: center;
      animation: firework 2s ease-out infinite;
    }
    
    /* Confeti */
    .confetti-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      opacity: 0;
      animation: confettiFall 4s linear infinite;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes floatHeart {
      0% {
        bottom: -10%;
        opacity: 0;
        transform: translateX(0) scale(0.7);
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        bottom: 110%;
        opacity: 0;
        transform: translateX(calc(var(--random-x, 0) * 1px)) scale(1);
      }
    }
    
    @keyframes firework {
      0% {
        transform: translate(var(--x, 50%), var(--y, 50%));
        width: 5px;
        height: 5px;
        opacity: 1;
      }
      100% {
        transform: translate(var(--x, 50%), var(--y, 50%));
        width: 0;
        height: 0;
        opacity: 0;
        box-shadow: 
          0 0 60px 60px #f44336, 
          0 0 100px 100px #2196f3, 
          0 0 140px 140px #ffeb3b;
      }
    }
    
    @keyframes confettiFall {
      0% {
        top: -10px;
        opacity: 1;
        transform: translateX(0) rotate(0deg);
      }
      100% {
        top: 100%;
        opacity: 0.3;
        transform: translateX(calc(var(--random-x, 0) * 1px)) rotate(calc(var(--random-rotate, 0) * 1deg));
      }
    }
    
    /* Media queries para responsividad */
    @media (max-width: 768px) {
      .final-letter-content {
        padding: 20px;
        width: 95%;
      }
      
      .final-letter-title {
        font-size: 1.7rem;
      }
      
      .final-letter-text {
        font-size: 1.1rem;
      }
      
      .thank-you h2 {
        font-size: 1.7rem;
      }
      
      .thank-you p {
        font-size: 1.3rem;
      }
      
      .close-button {
        padding: 10px 25px;
        font-size: 1.1rem;
      }
    }
    
    @media (max-width: 480px) {
      .final-letter-content {
        padding: 15px;
      }
      
      .final-letter-title {
        font-size: 1.5rem;
      }
      
      .final-letter-text {
        font-size: 1rem;
      }
      
      .thank-you h2 {
        font-size: 1.5rem;
      }
      
      .thank-you p {
        font-size: 1.2rem;
      }
      
      .close-button {
        padding: 8px 20px;
        font-size: 1rem;
      }
      
      .popup-content h3 {
        font-size: 1.5rem;
      }
      
      .popup-content p {
        font-size: 1.1rem;
      }
    }
  `,
  ],
})
export class FinalLetterComponent implements OnInit {
  finalLetterText = `Wow… No tienes idea lo que me tardó hacer esto, le metí cada esfuerzo que tú me diste. Gracias, gracias por ser la razón de que mi vida ahora tenga una razón, gracias por hacerme sonreir, gracias por darme un sentido, gracias por ser tú, gracias. No tienes idea las gracias que debo darte. No me había enamorado tanto de una persona para llegar a hacer ésto. Te amo demasiado Natalia, tqm mi niña, nunca lo olvides. TE AMOOO`

  showCelebration = false
  showThankYou = false
  showClosePopup = false

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    // Iniciar efectos de celebración después de un breve retraso
    setTimeout(() => {
      this.setupCelebrationEffects()
    }, 500)
  }

  onTypingComplete() {
    this.showCelebration = true
    this.audioService.playCelebrationSound()

    setTimeout(() => {
      this.showThankYou = true
    }, 2000)
  }

  setupCelebrationEffects() {
    // Configurar corazones
    this.setupHearts()

    // Configurar fuegos artificiales
    this.setupFireworks()

    // Configurar confeti
    this.setupConfetti()
  }

  setupHearts() {
    const hearts = document.querySelectorAll(".heart")
    hearts.forEach((heart: Element) => {
      const div = heart as HTMLDivElement
      const randomX = Math.random() * 100
      const randomDelay = Math.random() * 5
      const randomDuration = Math.random() * 2 + 3

      div.style.left = `${randomX}%`
      div.style.setProperty("--random-x", `${Math.random() * 50 - 25}`)
      div.style.animationDelay = `${randomDelay}s`
      div.style.animationDuration = `${randomDuration}s`
    })
  }

  setupFireworks() {
    const fireworks = document.querySelectorAll(".firework")
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

    fireworks.forEach((firework: Element) => {
      const div = firework as HTMLDivElement
      const x = Math.random() * 100
      const y = Math.random() * 100
      const color = colors[Math.floor(Math.random() * colors.length)]
      const delay = Math.random() * 5

      div.style.backgroundColor = color
      div.style.setProperty("--x", `${x}%`)
      div.style.setProperty("--y", `${y}%`)
      div.style.animationDelay = `${delay}s`
    })
  }

  setupConfetti() {
    const confetti = document.querySelectorAll(".confetti")
    const colors = [
      "#e76f51",
      "#f4a261",
      "#e9c46a",
      "#2a9d8f",
      "#264653",
      "#ff0000",
      "#ff00ff",
      "#ffff00",
      "#00ff00",
      "#00ffff",
    ]

    confetti.forEach((confettiPiece: Element) => {
      const div = confettiPiece as HTMLDivElement
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 10 + 5
      const left = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 2 + 3
      const shape = Math.random() > 0.5 ? "50%" : "0%"

      div.style.backgroundColor = color
      div.style.width = `${size}px`
      div.style.height = `${size}px`
      div.style.left = `${left}%`
      div.style.borderRadius = shape
      div.style.setProperty("--random-x", `${Math.random() * 200 - 100}`)
      div.style.setProperty("--random-rotate", `${Math.random() * 360}`)
      div.style.animationDelay = `${delay}s`
      div.style.animationDuration = `${duration}s`
    })
  }

  closeApp() {
    this.showClosePopup = true
  }

  finalClose() {
    // Cerrar la aplicación
    window.close()

    // Fallback si window.close() no funciona
    document.body.innerHTML =
      '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial; font-size: 24px; background-color: #f8f4e3; color: #333; text-align: center; padding: 20px;">Ahora ya sabes qué hacer.<br>¡Búscame y dame un abrazo!</div>'
  }
}
