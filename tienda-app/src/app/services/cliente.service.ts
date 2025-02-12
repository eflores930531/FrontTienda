import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  
import { Clientes } from '../models/clientes.interface';  // Mantén el nombre en plural si lo deseas

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:5293/api/cliente'; 

  constructor(private http: HttpClient) {}

  // Método para obtener todos los clientes
  getClientes(): Observable<Clientes[]> {
    return this.http.get<{ $values: Clientes[] }>(this.apiUrl).pipe(
      map(response => response.$values)
    );
  }

  // Método para obtener un cliente por ID
  getById(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${this.apiUrl}/${id}`);
  }

  // Método para crear un nuevo cliente
  create(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiUrl, cliente);
  }

  // Método para actualizar un cliente existente
  update(id: number, cliente: Clientes): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cliente);
  }

  // Método para eliminar un cliente
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
