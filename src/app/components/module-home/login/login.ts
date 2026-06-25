import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/Auth.Service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  login: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  Acceder() {
    this.error = '';

    this.authService.login({
      login: this.login,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        // guardar sesión
        this.authService.saveSession(res);

        // redirigir
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Credenciales incorrectas';
      }
    });
  }
}
