import { inject, Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly TOKEN_KEY = 'access_token';

  private makeUserApiRequest(action: string, data: any): Observable<IResponse> {
    return this.http.post<IResponse>(`${AppConstants.API_URL}/user/${action}`, data);
  }

  login(email: string, password: string): Observable<IResponse> {
    return this.makeUserApiRequest('login', { email, password });
  }

  register(email: string, password: string): Observable<IResponse> {
    return this.makeUserApiRequest('registration', { email, password });
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
