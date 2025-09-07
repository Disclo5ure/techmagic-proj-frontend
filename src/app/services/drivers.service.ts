import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDriver } from '../models/IDriver';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private http = inject(HttpClient);

  getAll(): Observable<IDriver[]> {
    return this.http.get<IDriver[]>(`${AppConstants.API_URL}/drivers/getAllDrivers`);
  }

  create(driver: IDriver): Observable<IDriver> {
    return this.http.post<IDriver>(`${AppConstants.API_URL}/drivers/create`, driver);
  }
}
