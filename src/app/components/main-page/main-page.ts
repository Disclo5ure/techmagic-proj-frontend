import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavBar } from '../nav-bar/nav-bar';

@Component({
  selector: 'app-main-page',
  imports: [RouterOutlet, NavBar],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    !this.authService.getToken() ? this.router.navigateByUrl('/registration') : null;
  }
}
