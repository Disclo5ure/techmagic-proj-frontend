import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { IRoute } from '../models/IRoute';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private http = inject(HttpClient);

  getAll(): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(`${AppConstants.API_URL}/routes/getAllRoutes`);
  }

  create(route: IRoute): Observable<IRoute> {
    return this.http.post<IRoute>(`${AppConstants.API_URL}/routes/create`, route);
  }
}
