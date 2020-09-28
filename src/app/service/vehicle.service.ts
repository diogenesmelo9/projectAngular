import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Vehicle } from '../model/vehicle.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  apiUrl = 'https://5eb9ba733f97140016992030.mockapi.io/vehicle';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private httpClient: HttpClient
  ) {}

    public getVehicles(): Observable<Vehicle[]>{
      return this.httpClient.get<Vehicle[]>(this.apiUrl);
    }

    public getVehiclesPerPlate(plate: string): Observable<Vehicle[]>{
      return this.httpClient.get<Vehicle[]>(this.apiUrl + '?filter=' + plate);
    }

    createVehicle(vehicle: Vehicle): Observable<Vehicle> {
      return this.httpClient.post<Vehicle>(this.apiUrl + '/' + vehicle.id, JSON.stringify(vehicle), this.httpOptions);
    }

    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
      return this.httpClient.put<Vehicle>(this.apiUrl + '/' + vehicle.id, JSON.stringify(vehicle), this.httpOptions);
    }

    deleteVehicle(vehicle: Vehicle): Observable<Vehicle> {
      return this.httpClient.delete<Vehicle>(this.apiUrl + '/' + vehicle.id);
    }
}
