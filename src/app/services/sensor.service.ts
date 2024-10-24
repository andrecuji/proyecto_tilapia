import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private baseUrl = 'http://172.20.10.2'; // Reemplaza con la IP de tu ESP32

  constructor(private http: HttpClient) { }

  // Método para obtener la temperatura del sensor DS18B20
  getTemperature(): Observable<any> {
    return this.http.get(`${this.baseUrl}/temperature`);
  }

  // Método para obtener el valor de pH
  getPh(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ph`);
  }

  // Método para obtener el valor de pH
  getO2(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ph`);
  }


  // Método para obtener el valor de pH
  getAmmonia(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ph`);
  }
}
