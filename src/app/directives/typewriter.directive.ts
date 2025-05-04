import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { AudioService } from "../services/audio.service"; // ✅ CORREGIDO: sin "type"

@Directive({
  selector: "[appTypewriter]",
  standalone: true,
})
export class TypewriterDirective implements OnInit, OnDestroy {
  @Input() text = ""
  @Input() speed = 50
  @Input() onComplete: () => void = () => {}

  private index = 0
  private timer: any = null

  constructor(
    private el: ElementRef,
    private audioService: AudioService, // ✅ Ya funcionará como inyección
  ) {}

  ngOnInit() {
    this.startTyping()
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  private startTyping() {
    this.el.nativeElement.textContent = ""
    this.index = 0
    this.typeNextCharacter()
  }

  private typeNextCharacter() {
    if (this.index < this.text.length) {
      const char = this.text.charAt(this.index)
      this.el.nativeElement.textContent += char

      if (char.trim() !== "") {
        this.audioService.playTypewriterSound()
      }

      this.index++
      const delay = [".", ",", "!", "?", ";", ":"].includes(char) ? this.speed * 4 : this.speed
      this.timer = setTimeout(() => this.typeNextCharacter(), delay)
    } else {
      if (this.onComplete) {
        this.onComplete()
      }
    }
  }

  reset() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.startTyping()
  }
}
