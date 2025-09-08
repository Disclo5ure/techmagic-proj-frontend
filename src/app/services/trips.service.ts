import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppConstants } from '../app.constants';
import { IAddedTrip, ITrip } from '../models/ITrip';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private http = inject(HttpClient);

  private tripsSubject = new BehaviorSubject<ITrip[]>([]);
  public trips$ = this.tripsSubject.asObservable();

  getAll(): void {
    this.http
      .get<ITrip[]>(`${AppConstants.API_URL}/trips/getAllTrips`)
      .subscribe((trips) => this.tripsSubject.next(trips));
  }

  create(trip: IAddedTrip): Observable<ITrip> {
    return this.http.post<ITrip>(`${AppConstants.API_URL}/trips/createTrip`, trip).pipe(
      tap((newTrip) => {
        const currentTrips = this.tripsSubject.value;
        this.tripsSubject.next([...currentTrips, newTrip]);
      }),
    );
  }
}
