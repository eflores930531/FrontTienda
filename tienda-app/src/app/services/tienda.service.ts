import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tiendas, TiendaResponse } from '../services/tiendas';  

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'http://localhost:5293/api/tienda'; // Cambia según la URL de tu API

  constructor(private http: HttpClient) {}

  getAll(): Observable<TiendaResponse> {  // Usamos TiendaResponse que tiene el array de Tiendas
    return this.http.get<TiendaResponse>(this.apiUrl);
  }

  getById(id: number): Observable<Tiendas> {  // Usamos Tiendas para obtener una tienda individual
    return this.http.get<Tiendas>(`${this.apiUrl}/${id}`);
  }

  create(tienda: Tiendas): Observable<Tiendas> {  // Se usa Tiendas (para un objeto de tienda)
    return this.http.post<Tiendas>(this.apiUrl, tienda);
  }

  update(id: number, tienda: Tiendas): Observable<void> {  // Se usa Tiendas para actualizar
    return this.http.put<void>(`${this.apiUrl}/${id}`, tienda);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
