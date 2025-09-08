import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppConstants } from '../app.constants';
import { IRoute } from '../models/IRoute';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private http = inject(HttpClient);

  private routesSubject = new BehaviorSubject<IRoute[]>([]);
  public routes$ = this.routesSubject.asObservable();

  getAll(): void {
    this.http
      .get<IRoute[]>(`${AppConstants.API_URL}/routes/getAllRoutes`)
      .subscribe((routes) => this.routesSubject.next(routes));
  }

  create(route: IRoute): Observable<IRoute> {
    return this.http.post<IRoute>(`${AppConstants.API_URL}/routes/createRoute`, route).pipe(
      tap((newRoute) => {
        const currentRoutes = this.routesSubject.value;
        this.routesSubject.next([...currentRoutes, newRoute]);
      }),
    );
  }
}
