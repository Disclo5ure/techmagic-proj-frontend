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
      name: 'Routes',
      path: 'routes',
      icon: 'routes',
    },
    {
      name: 'Drivers',
      path: 'drivers',
      icon: 'drivers',
    },
    {
      name: 'Completed trips',
      path: 'completed-trips',
      icon: 'trips',
    },
  ];

  logout() {
    this.authService.clearToken();
    this.router.navigateByUrl('/login');
  }
}
