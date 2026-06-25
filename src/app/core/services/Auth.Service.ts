import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  private rolesUrl = `${environment.apiUrl}/roles`;
  private userKey = 'auth_user';

  // Cache para mejorar el rendimiento
  private currentUserCache: any = null;
  private isAdminCache: boolean | null = null;

  constructor(private http: HttpClient) {}


      login(data: any) {
        return this.http.post(`${this.apiUrl}/login`, data);
      }

      register(data: any) {
        return this.http.post(`${this.apiUrl}/register`, data);
      }

      me() {
        return this.http.get(`${this.apiUrl}/me`);
      }

      logout() {
        return this.http.post(`${this.apiUrl}/logout`, {});
      }

      saveSession(data: any) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
      }

      isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
      }

      getRoles() {
        return this.http.get(`${this.apiUrl}/roles`);
      }
    
}
