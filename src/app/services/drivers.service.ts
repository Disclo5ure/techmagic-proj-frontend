import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IDriver } from '../models/IDriver';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private http = inject(HttpClient);

  private driversSubject = new BehaviorSubject<IDriver[]>([]);
  public drivers$ = this.driversSubject.asObservable();

  getAll(): void {
    this.http
      .get<IDriver[]>(`${AppConstants.API_URL}/drivers/getAllDrivers`)
      .subscribe((drivers) => this.driversSubject.next(drivers));
  }

  create(driver: IDriver): Observable<IDriver> {
    return this.http.post<IDriver>(`${AppConstants.API_URL}/drivers/createDriver`, driver).pipe(
      tap((newDriver) => {
        const currentDrivers = this.driversSubject.value;
        this.driversSubject.next([...currentDrivers, newDriver]);
      }),
    );
  }
}
