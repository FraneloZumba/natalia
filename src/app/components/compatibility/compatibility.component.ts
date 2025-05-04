import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Chart, registerables } from "chart.js"
import { StateService } from "../../services/state.service"
import { trigger, transition, style, animate } from "@angular/animations"

Chart.register(...registerables)

@Component({
  selector: "app-compatibility",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="compatibility-container" [@fadeIn]>
      <h2 class="compatibility-title">Nuestra Compatibilidad</h2>
      
      <div class="charts-container">
        <div class="chart-wrapper">
          <h3>Intereses Compartidos</h3>
          <canvas id="pieChart"></canvas>
        </div>
        
        <div class="chart-wrapper">
          <h3>Compatibilidad Musical</h3>
          <canvas id="barChart"></canvas>
        </div>
      </div>
      
      <div class="compatibility-table">
        <h3>Lo Que Tenemos en Común</h3>
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Fran</th>
              <th>Nat</th>
              <th>Compatibilidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bebidas</td>
              <td>Café</td>
              <td>Café</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Deportes</td>
              <td>Básquet</td>
              <td>Básquet</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Videojuegos</td>
              <td>Roblox, Minecraft</td>
              <td>Roblox, Minecraft</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Música</td>
              <td>Rock, Trap, Reggaetón</td>
              <td>Rock, Trap, Reggaetón</td>
              <td>89%</td>
            </tr>
            <tr>
              <td>Pasatiempos</td>
              <td>Leer, Música, Salir</td>
              <td>Leer, Música, Salir</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Películas</td>
              <td>Marvel</td>
              <td>Marvel</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Signo Zodiacal</td>
              <td>Acuario</td>
              <td>Capricornio</td>
              <td>85%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="zodiac-compatibility">
        <h3>Compatibilidad Zodiacal: Acuario ♒ y Capricornio ♑</h3>
        <p>
          Acuario y Capricornio forman una pareja interesante y complementaria. Mientras que Capricornio aporta estabilidad, 
          disciplina y sentido práctico, Acuario trae innovación, originalidad y una visión de futuro. 
          Esta combinación crea un equilibrio perfecto entre tradición y modernidad.
        </p>
        <p>
          En el amor, ambos signos valoran la lealtad y el compromiso a largo plazo. 
          Capricornio aprecia la creatividad y las ideas frescas de Acuario, 
          mientras que Acuario admira la determinación y la responsabilidad de Capricornio.
        </p>
        <p>
          Con comunicación y respeto mutuo, esta relación tiene un gran potencial para crecer 
          y convertirse en un vínculo duradero y satisfactorio.
        </p>
      </div>
      
      <button class="vintage-button" (click)="onContinue()">
        Continuar
      </button>
    </div>
  `,
  styles: [
    `
    .compatibility-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.7);
      border: 1px solid #333;
      box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .compatibility-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 30px;
      text-decoration: underline;
    }
    
    .charts-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
      margin-bottom: 30px;
    }
    
    .chart-wrapper {
      width: 45%;
      min-width: 300px;
      margin-bottom: 20px;
    }
    
    .chart-wrapper h3 {
      text-align: center;
      margin-bottom: 10px;
    }
    
    .compatibility-table {
      width: 100%;
      margin-bottom: 30px;
    }
    
    .compatibility-table h3 {
      text-align: center;
      margin-bottom: 15px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Special Elite', cursive;
    }
    
    th, td {
      border: 1px solid #333;
      padding: 10px;
      text-align: center;
    }
    
    th {
      background-color: #e8e4d3;
    }
    
    tr:nth-child(even) {
      background-color: #f8f4e3;
    }
    
    .zodiac-compatibility {
      width: 100%;
      margin-bottom: 30px;
      padding: 15px;
      background-color: #f8f4e3;
      border: 1px solid #333;
    }
    
    .zodiac-compatibility h3 {
      text-align: center;
      margin-bottom: 15px;
    }
    
    .zodiac-compatibility p {
      margin-bottom: 10px;
      line-height: 1.6;
      text-align: justify;
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
      margin-top: 20px;
    }
    
    .vintage-button:hover {
      background-color: #e8e4d3;
      box-shadow: 1px 1px 0 #333;
      transform: translate(2px, 2px);
    }
  `,
  ],
  animations: [
    trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("1s ease-in", style({ opacity: 1 }))])]),
  ],
})
export class CompatibilityComponent implements OnInit {
  constructor(private stateService: StateService) {}

  ngOnInit() {
    setTimeout(() => {
      this.createPieChart()
      this.createBarChart()
    }, 500)
  }

  createPieChart() {
    const ctx = document.getElementById("pieChart") as HTMLCanvasElement
    if (!ctx) return

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Intereses Compartidos", "Intereses Únicos"],
        datasets: [
          {
            data: [85, 15],
            backgroundColor: ["#e76f51", "#2a9d8f"],
            borderColor: ["#333", "#333"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
            },
          },
        },
      },
    })
  }

  createBarChart() {
    const ctx = document.getElementById("barChart") as HTMLCanvasElement
    if (!ctx) return

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Rock", "Trap", "Reggaetón", "Otros"],
        datasets: [
          {
            label: "Compatibilidad Musical",
            data: [95, 90, 85, 75],
            backgroundColor: ["#e9c46a", "#f4a261", "#e76f51", "#2a9d8f"],
            borderColor: ["#333", "#333", "#333", "#333"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => value + "%",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `Compatibilidad: ${context.raw}%`,
            },
          },
        },
      },
    })
  }

  onContinue() {
    this.stateService.nextScreen()
  }
}
