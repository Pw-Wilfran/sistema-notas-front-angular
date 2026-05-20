import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {
  User,
  CreateUserDto,
  UpdateUserDto,
  PaginatedResponse,
  AssignRolesDto,
} from '../interface/user.model';
import { catchError, Observable, throwError } from 'rxjs';

export interface UserQueryParams {
  page?: number;
  per_page?: number;
  filter?: string;
  sort?: string;
  include?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private rolesUrl = `${environment.apiUrl}/roles`;

  // Cache para mejorar el rendimiento
  private currentUserCache: any = null;
  private isAdminCache: boolean | null = null;

  constructor(private http: HttpClient) {}

  // ─── READ ────────────────────────────────────────────────────────────────

  getAll(
    params?: UserQueryParams,
  ): Observable<PaginatedResponse<User> | User[]> {
    let httpParams = new HttpParams();

    if (params?.page) httpParams = httpParams.set('page', params.page);
    if (params?.per_page)
      httpParams = httpParams.set('per_page', params.per_page);
    if (params?.filter) httpParams = httpParams.set('filter', params.filter);
    if (params?.sort) httpParams = httpParams.set('sort', params.sort);
    if (params?.include) httpParams = httpParams.set('include', params.include);

    return this.http
      .get<
        PaginatedResponse<User> | User[]
      >(this.apiUrl, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // ─── WRITE ───────────────────────────────────────────────────────────────

  create(dto: CreateUserDto): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, dto)
      .pipe(catchError(this.handleError));
  }

  update(id: number, dto: UpdateUserDto): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/${id}`, dto)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<User> {
    return this.http
      .delete<User>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  assignRoles(
    id: number,
    dto: AssignRolesDto,
  ): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/${id}/assign-roles`, dto)
      .pipe(catchError(this.handleError));
  }

  // ─── ERROR HANDLER ───────────────────────────────────────────────────────

  private handleError(error: any): Observable<never> {
    let message = 'Ocurrió un error inesperado.';

    if (error.status === 422 && error.error?.errors) {
      const validationErrors = Object.values(error.error.errors).flat();
      message = (validationErrors as string[]).join(' ');
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }

    return throwError(() => new Error(message));
  }
}
