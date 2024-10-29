import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';
import { interval } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { DatosTotalComponent } from '../../datos-total/datos-total.component';

@Component({
  selector: 'app-grafico-ammoniaco',
  standalone: true,
  imports: [HttpClientModule, ToastModule],
  templateUrl: './grafico-ammoniaco.component.html',
  styleUrl: './grafico-ammoniaco.component.css',
  providers: [MessageService, SensorService, DatosTotalComponent] 

})
export class GraficoAmmoniacoComponent implements OnInit, OnDestroy {
  ammoniaData: number[] = [];
  chartLabels: string[] = [];
  private chart!: Chart<'line', number[]>;

  constructor(private sensorDataService: SensorService) { // Cambiar la inyección
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeChart();
    this.startAmmoniaUpdates();
  }

  initializeChart(): void {
    this.chart = new Chart('ammoniaChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.ammoniaData,
            label: 'Nivel de Amoníaco',
            fill: true, // Activar el relleno debajo de la línea
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color del fondo (relleno debajo de la línea)
            borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color de los puntos
            pointBorderColor: '#fff', // Color del borde de los puntos
            pointHoverBackgroundColor: '#fff', // Color del punto al pasar el ratón
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Color del borde del punto al pasar el ratón
            tension: 0.1 // Suavidad de la línea
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.5)' // Color de las líneas del eje Y
            },
            ticks: {
              color: 'white', // Color de los números del eje Y
              padding: 10 // Espaciado entre los números y las líneas del eje Y
            }
          },
          x: {
            grid: {
              color: 'rgba(200, 200, 200, 0.5)' // Color de las líneas del eje X
            },
            ticks: {
              color: 'white', // Color de los números del eje X
              padding: 10 // Espaciado entre los números y las líneas del eje X
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white' // Color del texto de la leyenda
            }
          }
        }
      }
    });
  }
  

  startAmmoniaUpdates(): void {
    interval(4000).subscribe(() => {
      this.updateChartData();
    });
  }

  updateChartData(): void {
    const savedHistory = localStorage.getItem('ammoniaHistory');
    if (savedHistory) {
      this.ammoniaData = JSON.parse(savedHistory); // Obtener el historial de amoníaco desde localStorage
    }
    this.chartLabels = this.ammoniaData.map((_, index) => `Medición ${index + 1}`); // Generar etiquetas para el gráfico
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.ammoniaData;
    this.chart.update();
  }

  ngOnDestroy(): void {
    // Aquí puedes limpiar cualquier suscripción si es necesario
  }
}