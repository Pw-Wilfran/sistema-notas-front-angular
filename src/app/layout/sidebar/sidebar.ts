import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { SidebarService } from './sidebar.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/Auth.Service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {}

  closeSidebar() {
    this.sidebarService.close();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  logout() {

    this.authService.logout().subscribe({
      next: () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.router.navigate(['/login']);
      },

      error: () => {

        // aunque falle el backend
        // limpiamos sesión local

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.router.navigate(['/login']);
      }
    });
  }
}
