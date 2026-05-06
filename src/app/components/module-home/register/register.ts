import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/Auth.Service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register  {

  roles: any[] = [];

  name: string = '';
  last_name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  role_id: number = 1; // por defecto (ej: estudiante)

  error: string = '';
  success: string = '';
  form: any = {
      role_id: ''
    };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.error = '';
    this.success = '';

    this.authService.register({
      name: this.name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      password: this.password,
      role_id: this.role_id
    }).subscribe({
      next: () => {
        this.success = 'Usuario creado correctamente';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrarse';
      }
    });


    
    
  }

  

  ngOnInit() {
    this.authService.getRoles().subscribe((res: any) => {
      this.roles = res;
    });
  }
}
