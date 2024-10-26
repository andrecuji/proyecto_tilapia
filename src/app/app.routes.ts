import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { GraficoTotalComponent } from './components/graficos/grafico-total/grafico-total.component';
import { UtilesComponent } from './utiles/utiles.component';
import { GraficoPhComponent } from './components/graficos/grafico-ph/grafico-ph.component';
import { GraficoTemperaturaComponent } from './components/graficos/grafico-temperatura/grafico-temperatura.component';
import { GraficoOxigenoComponent } from './components/graficos/grafico-oxigeno/grafico-oxigeno.component';
import { GraficoAmmoniacoComponent } from './components/graficos/grafico-ammoniaco/grafico-ammoniaco.component';
import { DatosTotalComponent } from './components/datos-total/datos-total.component';





export const routes: Routes = [

  { path: '', redirectTo: '/home/datos-total', pathMatch: 'full' },
    {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: 'graficos', component: GraficoTotalComponent },
        { path: 'utiles', component: UtilesComponent },
        {path: 'graficos/ph', component: GraficoPhComponent},
        {path: 'graficos/temperatura', component: GraficoTemperaturaComponent},
        {path: 'graficos/oxigeno', component: GraficoOxigenoComponent},
        {path: 'graficos/ammoniaco', component: GraficoAmmoniacoComponent},
        {path: 'datos-total', component: DatosTotalComponent}
      ]
    }
  ];