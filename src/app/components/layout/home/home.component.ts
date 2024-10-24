import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsideComponent } from "../aside/aside.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SensorService } from '../../../services/sensor.service';
import { interval, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AsideComponent, HeaderComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [SensorService]
})
export class HomeComponent implements OnInit, OnDestroy {
  phValue: number | null = null;
  temperatureValue: number | null = null;
  oxygenDissolved: number | null = null;
  private temperatureSubscription!: Subscription;

  constructor(private sensorDataService: SensorService) {}

  ngOnInit(): void {
    this.temperatureSubscription = interval(1000).subscribe(() => this.fetchSensorData());
  }

  fetchSensorData(): void {
    // Obtener el valor de pH
    this.sensorDataService.getPh().subscribe(data => {
      this.phValue = data.ph; // Asegúrate de que 'data.ph' sea correcto
      this.calculateOxygenDissolved(); // Calcula el oxígeno disuelto después de obtener pH
    });

    // Obtener el valor de temperatura
    this.sensorDataService.getTemperature().subscribe(data => {
      this.temperatureValue = data.temperature; // Asegúrate de que 'data.temperature' sea correcto
      this.calculateOxygenDissolved(); // Calcula el oxígeno disuelto después de obtener temperatura
    });
  }

  // Método para calcular el oxígeno disuelto
  calculateOxygenDissolved(): void {
    if (this.phValue !== null && this.temperatureValue !== null) {
      const T = this.temperatureValue; // Temperatura
      const pH = this.phValue; // pH
      this.oxygenDissolved = (14.6 - 0.39 * T + 0.008 * T ** 2) * (1 + 0.02 * (7 - pH));
    } else {
      this.oxygenDissolved = null; // Si no hay valores, el oxígeno disuelto no puede ser calculado
    }
  }

  ngOnDestroy(): void {
    // Limpia la suscripción al componente se destruye
    this.temperatureSubscription.unsubscribe();
  }
}
