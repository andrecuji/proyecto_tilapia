import { Component } from '@angular/core';
import { GraficoTemperaturaComponent } from "../grafico-temperatura/grafico-temperatura.component";
import { GraficoOxigenoComponent } from "../grafico-oxigeno/grafico-oxigeno.component";
import { GraficoAmmoniacoComponent } from "../grafico-ammoniaco/grafico-ammoniaco.component";
import { GraficoPhComponent } from "../grafico-ph/grafico-ph.component";

@Component({
  selector: 'app-grafico-total',
  standalone: true,
  imports: [GraficoTemperaturaComponent, GraficoOxigenoComponent, GraficoAmmoniacoComponent, GraficoPhComponent],
  templateUrl: './grafico-total.component.html',
  styleUrl: './grafico-total.component.css'
})
export class GraficoTotalComponent {

}
