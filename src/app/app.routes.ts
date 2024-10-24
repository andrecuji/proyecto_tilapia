import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { GraficoTotalComponent } from './components/graficos/grafico-total/grafico-total.component';
import { UtilesComponent } from './utiles/utiles.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'graficos', component: GraficoTotalComponent },
    { path: 'utiles', component: UtilesComponent },
];
