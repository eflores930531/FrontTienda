import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';  // Usamos JwtHelperService
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5293/api/auth';  // Asegúrate de que la URL sea correcta.
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  // Iniciar sesión y recibir el token
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Registrar un nuevo usuario
  register(nombre: string, apellidos: string, direccion: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { nombre, apellidos, direccion, email, password });
  }

  // Guardar token en localStorage
  setToken(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);  // Decodificamos el token con JwtHelperService
    localStorage.setItem('token', token);  // Guardamos el token completo
    localStorage.setItem('user', JSON.stringify(decodedToken.email));  // Guardamos los datos decodificados
  }

  // Obtener token almacenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Eliminar token al cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);  // Usa JwtHelperService para verificar expiración
  }

  // Verificar si el token está expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;  // Usa JwtHelperService
  }

  // Obtener información del usuario desde el token
  getUserInfo(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;  // Usa JwtHelperService para decodificar el token
  }

  // Obtener headers con autorización
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`  // Añade el token en la cabecera
    });
  }
}
