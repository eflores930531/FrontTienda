import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Clientes } from '../../models/clientes.interface';  // Importa la interfaz correctamente
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Clientes[] = [];  // Usa 'Clientes' plural

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  deleteCliente(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.delete(id).subscribe(() => {
        this.loadClientes();
      });
    }
  }
}
