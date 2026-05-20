import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/User.Service';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { PaginatedResponse } from '../../../core/interface/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  username: string;
  active: boolean;
  created_at: string;
  updated_at: string;

}

@Component({
  selector: 'app-user',
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error: string | null = null;
 
  // Pagination
  currentPage = 1;
  lastPage = 1;
  total = 0;
  perPage = 10;
 
  // Search & sort
  searchQuery = '';
  sortField = '';
  sortDir: 'asc' | 'desc' = 'asc';
 
  private search$ = new Subject<string>();
  private destroy$ = new Subject<void>();
 
  constructor(private userService: UserService, private router: Router) {}
 
  ngOnInit(): void {
    this.loadUsers();
 
    this.search$
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentPage = 1;
        this.loadUsers();
      });
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
 
  loadUsers(): void {
    this.loading = true;
    this.error = null;
 
    const params = {
      page: this.currentPage,
      per_page: this.perPage,
      ...(this.searchQuery && { filter: this.searchQuery }),
      ...(this.sortField && { sort: `${this.sortDir === 'desc' ? '-' : ''}${this.sortField}` }),
    };
 
    this.userService.getAll(params).subscribe({
      next: (res) => {
        if (this.isPaginated(res)) {
          this.users = res.data;
          this.lastPage = res.last_page;
          this.total = res.total;
        } else {
          this.users = res as User[];
          this.total = this.users.length;
          this.lastPage = 1;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
 
  onSearch(value: string): void {
    this.searchQuery = value;
    this.search$.next(value);
  }
 
  sort(field: string): void {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDir = 'asc';
    }
    this.loadUsers();
  }
 
  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage) return;
    this.currentPage = page;
    this.loadUsers();
  }
 
  deleteUser(user: User): void {
    if (!confirm(`¿Eliminar a ${user.name} ${user.last_name}?`)) return;
 
    this.userService.delete(user.id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => (this.error = err.message),
    });
  }
 
  get pages(): number[] {
    return Array.from({ length: this.lastPage }, (_, i) => i + 1);
  }
 
  private isPaginated(res: any): res is PaginatedResponse<User> {
    return res && 'data' in res && 'last_page' in res;
  }

}
