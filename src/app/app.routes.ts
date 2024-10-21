import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { GraficoComponent } from './grafico/grafico.component';
import { UtilesComponent } from './utiles/utiles.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'graficos', component: GraficoComponent },
    { path: 'utiles', component: UtilesComponent },
];
