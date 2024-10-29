import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api'; // Importar el servicio de mensajes
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-grafico-oxigeno',
  standalone: true,
  imports: [HttpClientModule, ToastModule],
  templateUrl: './grafico-oxigeno.component.html',
  styleUrl: './grafico-oxigeno.component.css',
  providers: [MessageService, SensorService] 
})
export class GraficoOxigenoComponent implements OnInit, OnDestroy {
  phValue: number | null = null;
  temperatureValue: number | null = null;
  oxygenDissolvedData: number[] = [];
  chartLabels: string[] = [];
  private dataSubscription!: Subscription;
  private chart!: Chart<'line', number[]>;
  private lastOxygenDissolved: number | null = null;

  constructor(
    private sensorService: SensorService,
    private messageService: MessageService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeChart();
    this.startDataUpdates();
  }

  initializeChart(): void {
    this.chart = new Chart('oxygenChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.oxygenDissolvedData,
            label: 'Oxígeno Disuelto',
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(200, 200, 200, 0.5)' },
            ticks: { color: 'white', padding: 10 }
          },
          x: {
            grid: { color: 'red' },
            ticks: { color: 'white', padding: 10 }
          }
        },
        plugins: {
          legend: { labels: { color: 'white' } }
        }
      }
    });
  }

  startDataUpdates(): void {
    this.dataSubscription = interval(4000)
      .subscribe(() => this.fetchSensorData());
  }

  fetchSensorData(): void {
    this.sensorService.getPh().subscribe(data => {
      this.phValue = data.ph;
      this.calculateAndDisplayOxygen();
    });

    this.sensorService.getTemperature().subscribe(data => {
      this.temperatureValue = data.temperature;
      //this.calculateAndDisplayOxygen();
    });
  }

  calculateAndDisplayOxygen(): void {
    if (this.phValue !== null && this.temperatureValue !== null) {
      const T = this.temperatureValue;
      const pH = this.phValue;
      const oxygenDissolved = (14.6 - 0.39 * T + 0.008 * T ** 2) * (1 + 0.02 * (7 - pH));

      //if (this.lastOxygenDissolved === null || oxygenDissolved !== this.lastOxygenDissolved) {
        this.lastOxygenDissolved = oxygenDissolved;
        this.oxygenDissolvedData.push(oxygenDissolved);
        this.chartLabels.push(new Date().toLocaleTimeString());
        this.updateChartData();

        if (oxygenDissolved < 2) {
          this.sendRiskNotification(oxygenDissolved);
        }
      //}
    }
  }

  sendRiskNotification(oxygenValue: number): void {
    this.messageService.add({
      key: 'customToast',
      summary: '⚠️ Advertencia de Oxígeno',
      detail: `El oxígeno disuelto ha caído a un nivel bajo de ${oxygenValue.toFixed(2)} mg/L.`,
      life: 2000,
      styleClass: 'custom-toast'
    });
  }

  updateChartData(): void {
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.oxygenDissolvedData;
    this.chart.update();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
