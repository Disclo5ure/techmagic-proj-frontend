import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLinkActive, RouterLink, MatButton],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  private authService = inject(AuthService);
  private router = inject(Router);

  tabs = [
    {
      name: 'Маршрути',
      path: 'routes',
      icon: 'routes',
    },
    {
      name: 'Водії',
      path: 'drivers',
      icon: 'drivers',
    },
    {
      name: 'Виконані перевезення',
      path: 'completed-trips',
      icon: 'trips',
    },
  ];

  logout() {
    this.authService.clearToken();
    this.router.navigateByUrl('/login');
  }
}
