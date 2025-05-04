import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TypewriterDirective } from "../../directives/typewriter.directive"
import { StateService } from "../../services/state.service"
import { AudioService } from "../../services/audio.service"

@Component({
  selector: "app-proposal",
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  template: `
    <div class="proposal-container">
      <div class="proposal-content">
        <div class="proposal-text" appTypewriter [text]="proposalText" [onComplete]="onTypingComplete.bind(this)"></div>
        
        <div class="question" [class.visible]="showQuestion">
          <h2>¿Quieres ser mi novia?</h2>
          
          <div class="buttons">
            <button class="yes-button" (click)="onYesClick()">Sí</button>
            <button class="no-button" (click)="onNoClick()">No</button>
          </div>
        </div>
      </div>
      
      <div class="windows-popup" *ngIf="showPopup">
        <div class="popup-header">
          <div class="popup-title">Confirmación</div>
          <button class="close-button" (click)="closePopup()">✕</button>
        </div>
        <div class="popup-content">
          <div class="popup-icon">❓</div>
          <div class="popup-message">¿Estás segura de que quieres decir que no?</div>
        </div>
        <div class="popup-buttons">
          <button class="popup-button" (click)="onFinalNo()">Sí, estoy segura</button>
          <button class="popup-button" (click)="closePopup()">No, quiero cambiar mi respuesta</button>
        </div>
      </div>
      
      <div class="countdown-popup" *ngIf="showCountdown">
        <div class="popup-header">
          <div class="popup-title">Notificación</div>
        </div>
        <div class="popup-content">
          <div class="popup-icon">ℹ️</div>
          <div class="popup-message">
            Entiendo. Se notificará a Fran de tu respuesta.
            <br><br>
            La aplicación se cerrará en {{countdown}} segundos.
          </div>
        </div>
      </div>
      
      <!-- Confeti para la celebración -->
      <div class="confetti-container" *ngIf="showConfetti">
        <div class="confetti" *ngFor="let i of [].constructor(100)"></div>
      </div>
    </div>
  `,
  styles: [
    `
    .proposal-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      padding: 20px;
      position: relative;
      animation: fadeIn 1s ease-in;
    }
    
    .proposal-content {
      background-color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      border: 1px solid #333;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
      max-width: 800px;
      width: 95%;
      margin-bottom: 30px;
    }
    
    .proposal-text {
      font-size: 1.2rem;
      line-height: 1.8;
      text-align: justify;
      margin-bottom: 30px;
      white-space: pre-line;
    }
    
    .question {
      text-align: center;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .question.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .question h2 {
      font-size: 2rem;
      margin-bottom: 30px;
      color: #333;
    }
    
    .buttons {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }
    
    .yes-button, .no-button {
      padding: 15px 40px;
      font-size: 1.2rem;
      font-family: 'Special Elite', cursive;
      border: 2px solid #333;
      cursor: pointer;
      transition: all 0.3s;
      margin-bottom: 10px;
    }
    
    .yes-button {
      background-color: #2a9d8f;
      color: white;
      box-shadow: 3px 3px 0 #333;
    }
    
    .yes-button:hover {
      background-color: #218a7e;
      box-shadow: 1px 1px 0 #333;
      transform: translate(2px, 2px);
    }
    
    .no-button {
      background-color: #e76f51;
      color: white;
      box-shadow: 3px 3px 0 #333;
    }
    
    .no-button:hover {
      background-color: #d66046;
      box-shadow: 1px 1px 0 #333;
      transform: translate(2px, 2px);
    }
    
    /* Windows 98 style popup */
    .windows-popup, .countdown-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 400px;
      background-color: #c0c0c0;
      border: 2px outset #ffffff;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
      z-index: 1000;
      animation: popupFadeIn 0.3s ease-out;
    }
    
    .popup-header {
      background: linear-gradient(to right, #000080, #1084d0);
      color: white;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Arial', sans-serif;
      font-weight: bold;
    }
    
    .close-button {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
    
    .popup-content {
      padding: 20px;
      display: flex;
      align-items: center;
    }
    
    .popup-icon {
      font-size: 32px;
      margin-right: 20px;
    }
    
    .popup-message {
      font-family: 'Arial', sans-serif;
      font-size: 14px;
    }
    
    .popup-buttons {
      display: flex;
      justify-content: center;
      padding: 10px;
      background-color: #c0c0c0;
      border-top: 1px solid #a0a0a0;
      flex-wrap: wrap;
    }
    
    .popup-button {
      background-color: #c0c0c0;
      border: 2px outset #ffffff;
      padding: 5px 10px;
      margin: 5px;
      font-family: 'Arial', sans-serif;
      font-size: 12px;
      cursor: pointer;
    }
    
    .popup-button:active {
      border: 2px inset #ffffff;
    }
    
    /* Confeti */
    .confetti-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #f00;
      top: -10px;
      will-change: transform;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes popupFadeIn {
      from { 
        opacity: 0; 
        transform: translate(-50%, -60%);
      }
      to { 
        opacity: 1; 
        transform: translate(-50%, -50%);
      }
    }
    
    /* Media queries para responsividad */
    @media (max-width: 768px) {
      .proposal-content {
        padding: 20px;
      }
      
      .question h2 {
        font-size: 1.7rem;
      }
      
      .yes-button, .no-button {
        padding: 12px 30px;
        font-size: 1.1rem;
      }
    }
    
    @media (max-width: 480px) {
      .proposal-content {
        padding: 15px;
      }
      
      .proposal-text {
        font-size: 1.1rem;
      }
      
      .question h2 {
        font-size: 1.5rem;
      }
      
      .buttons {
        gap: 15px;
      }
      
      .yes-button, .no-button {
        padding: 10px 25px;
        font-size: 1rem;
      }
    }
  `,
  ],
})
export class ProposalComponent {
  proposalText = `Sé que es muy temprano para pedirtelo, no nos conocemos mucho tiempo… Pero, en verdad, siento que la conexión tan rápida que llegamos a tener, no se va a repetir nunca. Quiero seguirte conociendo y quiero tener muchas aventuras a tu lado, vivir muchas cosas, pero juntos. Nat, estoy con una corazonada tan grande, es totalmente un milagro el que te hayas aparecido en mi vida. Perdón, no quiero sonar intenso ni nada, y si no quieres está bien, pero…`

  showQuestion = false
  showPopup = false
  showCountdown = false
  showConfetti = false
  countdown = 5
  countdownInterval: any = null

  constructor(
    private stateService: StateService,
    private audioService: AudioService,
  ) {}

  onTypingComplete() {
    setTimeout(() => {
      this.showQuestion = true
    }, 1000)
  }

  onYesClick() {
    // Mostrar confeti antes de cambiar de pantalla
    this.showConfetti = true
    this.createConfetti()

    // Reproducir sonido de celebración
    this.audioService.playCelebrationSound()

    // Guardar respuesta y cambiar pantalla después de un breve retraso
    setTimeout(() => {
      this.stateService.saveResponse(true)
      this.stateService.nextScreen()
    }, 1500)
  }

  onNoClick() {
    this.showPopup = true
  }

  closePopup() {
    this.showPopup = false
  }

  onFinalNo() {
    this.showPopup = false
    this.showCountdown = true
    this.stateService.saveResponse(false)

    this.countdownInterval = setInterval(() => {
      this.countdown--
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval)
        // Cerrar la aplicación (en un entorno real, esto podría redirigir a una página de cierre)
        window.close()
        // Como fallback si window.close() no funciona (por políticas del navegador)
        document.body.innerHTML =
          '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial; font-size: 24px;">La aplicación se ha cerrado. Puedes cerrar esta pestaña.</div>'
      }
    }, 1000)
  }

  createConfetti() {
    const confettiContainer = document.querySelector(".confetti-container")
    if (!confettiContainer) return

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
    const confettiElements = confettiContainer.querySelectorAll(".confetti")

    confettiElements.forEach((confetti: Element, index) => {
      const div = confetti as HTMLDivElement
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 10 + 5
      const left = Math.random() * 100
      const animationDuration = Math.random() * 3 + 2
      const animationDelay = Math.random() * 2
      const shape = Math.random() > 0.5 ? "50%" : "0%"

      div.style.backgroundColor = color
      div.style.width = `${size}px`
      div.style.height = `${size}px`
      div.style.left = `${left}%`
      div.style.borderRadius = shape
      div.style.animation = `confettiDrop ${animationDuration}s ease-in infinite`
      div.style.animationDelay = `${animationDelay}s`
      div.style.transform = `rotate(${Math.random() * 360}deg)`
    })

    // Añadir keyframes para la animación de confeti
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes confettiDrop {
        0% {
          top: -10px;
          opacity: 1;
          transform: translateX(0) rotate(0deg);
        }
        100% {
          top: 100vh;
          opacity: 0.3;
          transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
        }
      }
    `
    document.head.appendChild(style)
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  }
}
