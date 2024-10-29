import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';
import { interval, Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api'; // Importar el servicio de mensajes
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-grafico-ammoniaco',
  standalone: true,
  imports: [HttpClientModule, ToastModule],
  templateUrl: './grafico-ammoniaco.component.html',
  styleUrl: './grafico-ammoniaco.component.css',
  providers: [MessageService, SensorService] 

})
export class GraficoAmmoniacoComponent {

}

