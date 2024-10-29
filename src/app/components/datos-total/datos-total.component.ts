import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SensorService } from '../../services/sensor.service';
import { interval, Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-total',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './datos-total.component.html',
  styleUrls: ['./datos-total.component.css'],
  providers: [SensorService]
})
export class DatosTotalComponent implements OnInit, OnDestroy {
  phValue: number | null = null;
  temperatureValue: number | null = null;
  oxygenDissolved: number | null = null;
  ammoniaLevel: number | null = null;
  ammoniaHistory: number[] = []; // Array para almacenar los niveles de amoníaco
  private temperatureSubscription!: Subscription;

  // Variables para el cálculo de amoníaco
  fishCount: number = 10;
  foodAmount: number = 5;
  waterVolume: number = 1;

  constructor(private sensorDataService: SensorService) {}

  ngOnInit(): void {
    // Cargar el historial de amoníaco desde localStorage
    const savedHistory = localStorage.getItem('ammoniaHistory');
    if (savedHistory) {
      this.ammoniaHistory = JSON.parse(savedHistory);
    }

    this.temperatureSubscription = interval(1000).subscribe(() => this.fetchSensorData());
  }

  fetchSensorData(): void {
    this.sensorDataService.getPh().subscribe(data => {
      this.phValue = data.ph;
      this.calculateOxygenDissolved();
    });

    this.sensorDataService.getTemperature().subscribe(data => {
      this.temperatureValue = data.temperature;
      this.calculateOxygenDissolved();
    });
  }

  calculateOxygenDissolved(): void {
    if (this.phValue !== null && this.temperatureValue !== null) {
      const T = this.temperatureValue;
      const pH = this.phValue;
      this.oxygenDissolved = (14.6 - 0.39 * T + 0.008 * T ** 2) * (1 + 0.02 * (7 - pH));
    } else {
      this.oxygenDissolved = null;
    }
  }

  calculateAmmonia(): void {
    this.ammoniaLevel = (this.fishCount * this.foodAmount * 0.03) / this.waterVolume;
    if (this.ammoniaLevel !== null) {
      this.ammoniaHistory.push(this.ammoniaLevel); // Guardar el nivel de amoníaco en el historial
      localStorage.setItem('ammoniaHistory', JSON.stringify(this.ammoniaHistory)); // Guardar en localStorage
    }
  }

  clearAmmoniaHistory(): void {
    this.ammoniaHistory = []; // Vaciar el array del historial
    localStorage.removeItem('ammoniaHistory'); // Eliminar del localStorage
  }
  

  ngOnDestroy(): void {
    if (this.temperatureSubscription) {
      this.temperatureSubscription.unsubscribe();
    }
  }
}
