import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TiendaService } from '../services/tienda.service';
import { Tiendas } from '../services/tiendas'; // Usa Tiendas en todas partes

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  tiendas: Tiendas[] = [];  // Ahora es Tiendas[]

  nuevaTienda: Tiendas = { tiendaID: 0, sucursal: '', direccion: '' };
  editando: boolean = false;

  constructor(private tiendaService: TiendaService) {}

  ngOnInit(): void {
    this.cargarTiendas();
  }

  cargarTiendas(): void {
    this.tiendaService.getAll().subscribe(data => {
      console.log('Respuesta de la API:', data); 
      if (data && Array.isArray(data.$values)) {
        this.tiendas = data.$values;  
      } else {
        console.error('La respuesta de la API no contiene un array válido de tiendas', data);
        this.tiendas = [];  
      }
    }, error => {
      console.error('Error al cargar las tiendas:', error);
      this.tiendas = [];  
    });
  }

  agregarTienda(): void {
    if (this.editando) {
      this.tiendaService.update(this.nuevaTienda.tiendaID, this.nuevaTienda).subscribe(() => {
        this.cargarTiendas();
        this.nuevaTienda = { tiendaID: 0, sucursal: '', direccion: '' };
        this.editando = false;
      });
    } else {
      this.tiendaService.create(this.nuevaTienda).subscribe(() => {
        this.cargarTiendas();
        this.nuevaTienda = { tiendaID: 0, sucursal: '', direccion: '' };
      });
    }
  }

  editarTienda(tienda: Tiendas): void {
    this.nuevaTienda = { ...tienda };
    this.editando = true;
  }

  eliminarTienda(id: number): void {
    this.tiendaService.delete(id).subscribe(() => this.cargarTiendas());
  }
}
