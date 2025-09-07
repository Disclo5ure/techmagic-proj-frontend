import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  isLogin = this.router.url === '/login';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  private useAuthService(action: string) {
    this.form.markAllAsTouched();

    if (!this.form.controls.email.errors && !this.form.controls.password.errors) {
      const observable =
        action === 'login'
          ? this.authService.login(
              this.form.controls.email.value,
              this.form.controls.password.value,
            )
          : this.authService.register(
              this.form.controls.email.value,
              this.form.controls.password.value,
            );

      observable.subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
          this.router.navigateByUrl('/routes');
        },
        error: (err) =>
          this.snackBar.open(err.error.message, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          }),
      });
    }
  }

  login() {
    this.useAuthService('login');
  }

  register() {
    this.useAuthService('register');
  }
}
