import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-grafico-ph',
  standalone: true,
  imports: [HttpClientModule, ToastModule],
  templateUrl: './grafico-ph.component.html',
  styleUrls: ['./grafico-ph.component.css'],
  providers: [MessageService, SensorService]
})
export class GraficoPhComponent implements OnInit, OnDestroy {
  phData: number[] = [];
  chartLabels: string[] = [];
  private phSubscription!: Subscription;
  private chart!: Chart<'line', number[]>;
  private lastPh: number | null = null;

  constructor(
    private sensorService: SensorService,
    private messageService: MessageService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeChart();
    this.startPhUpdates();
  }

  initializeChart(): void {
    this.chart = new Chart('phChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.phData,
            label: 'pH',
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(153, 102, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.5)'
            },
            ticks: {
              color: 'white',
              padding: 10
            }
          },
          x: {
            grid: {
              color: 'red'
            },
            ticks: {
              color: 'white',
              padding: 10
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  }

  startPhUpdates(): void {
    this.phSubscription = interval(5000)
      .subscribe(() => this.fetchPhData());
  }

  fetchPhData(): void {
    this.sensorService.getPh().subscribe(data => {
      if (this.lastPh === null || data.ph !== this.lastPh) {
        this.lastPh = data.ph;
        this.phData.push(data.ph);
        this.chartLabels.push(new Date().toLocaleTimeString());
        this.updateChartData();
        console.log("pH actualizado:", data.ph);

        // Verificar si el pH alcanza un nivel crítico para enviar una notificación
        if ( data.ph >= 10) { // Umbrales críticos, ajusta según sea necesario
          this.sendRiskNotification(data.ph);
        }
      }
    });
  }

  sendRiskNotification(phValue: number): void {
    this.messageService.add({
      key: 'customToast', 
      summary: '⚠️ Advertencia de pH',
      detail: `¡El pH ha alcanzado un nivel crítico: ${phValue}!`,
      life: 2000, 
      styleClass: 'custom-toast',
    });
  }

  updateChartData(): void {
    this.chart.data.labels = this.chartLabels;
    this.chart.data.datasets[0].data = this.phData;
    this.chart.update();
  }

  ngOnDestroy(): void {
    if (this.phSubscription) {
      this.phSubscription.unsubscribe();
    }
  }
}
