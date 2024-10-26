import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'] 
})
export class AsideComponent {

  constructor(private router: Router) { }

  IrAGraficos(): void {
    console.log("ir a graficos");
    this.router.navigate(['/home/graficos']).then(() => {
      window.location.reload();
    });
  }

  IrGraficosPh(): void {
    console.log("ir a graficos ph");
    this.router.navigate(['/home/graficos/ph']).then(() => {
      window.location.reload();
    });
  }

  IrGraficosTemperatura(): void {
    console.log("ir a graficos temperatura");
    this.router.navigate(['/home/graficos/temperatura']).then(() => {
      window.location.reload();
    });
  }

  IrGraficosOxigeno(): void {
    console.log("ir a graficos oxigeno");
    this.router.navigate(['/home/graficos/oxigeno']).then(() => {
      window.location.reload();
    });
  }

  IrGraficosAmmoniaco(): void {
    console.log("ir a graficos amoniaco");
    this.router.navigate(['/home/graficos/ammoniaco']).then(() => {
      window.location.reload();
    });
  }

  IrDatosTotal(): void {
    console.log("ir a datos total");
    this.router.navigate(['/home/datos-total']).then(() => {
      window.location.reload();
    });
  }

}
