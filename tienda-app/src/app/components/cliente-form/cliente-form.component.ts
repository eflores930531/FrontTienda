import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Clientes } from '../../models/clientes.interface';  // Asegúrate de importar la interfaz correcta

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  cliente: Clientes = { 
    clienteID: 0, 
    nombre: '', 
    email: '', 
    direccion: '', 
    apellidos: '',      // Añadido
    passwordHash: ''    // Añadido
  };
  isEdit: boolean = false;
  errorMessage: string = '';  // Variable para almacenar mensajes de error

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.clienteService.getById(+id).subscribe(
        cliente => this.cliente = cliente,
        error => this.errorMessage = 'Error al cargar los datos del cliente.'  // Manejo de error
      );
    }
  }

  saveCliente() {
    if (this.isEdit) {
      this.clienteService.update(this.cliente.clienteID, this.cliente).subscribe(
        () => {
          this.router.navigate(['/clientes']);
        },
        error => {
          this.errorMessage = 'Error al actualizar el cliente.';  // Manejo de error
        }
      );
    } else {
      this.clienteService.create(this.cliente).subscribe(
        () => {
          this.router.navigate(['/clientes']);
        },
        error => {
          this.errorMessage = 'Error al crear el cliente.';  // Manejo de error
        }
      );
    }
  }
}
