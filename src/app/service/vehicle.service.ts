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

    public getVehiclePerPlate(plate: string): Observable<Vehicle>{
      return this.httpClient.get<Vehicle>(this.apiUrl + '?filter=' + plate);
    }

    public getVehiclesPerPlate(plate: string): Observable<Vehicle[]>{
      return this.httpClient.get<Vehicle[]>(this.apiUrl + '?filter=' + plate);
    }

    updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
      return this.httpClient.put<Vehicle>(this.apiUrl + '/' + vehicle.id, JSON.stringify(vehicle), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    deleteVehicle(vehicle: Vehicle): Observable<Vehicle> {
      return this.httpClient.delete<Vehicle>(this.apiUrl + '/' + vehicle.id)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
