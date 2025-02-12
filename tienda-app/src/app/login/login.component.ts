import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Indica que el componente es independiente
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule] // Importa FormsModule aquí
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login :', response);
        this.authService.setToken(response.token);  // Usamos el servicio para manejar el token
        this.router.navigate(['/dashboard']); // Redirigir correctamente
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}
