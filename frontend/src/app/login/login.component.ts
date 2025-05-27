import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private router = inject(Router)
  //constructor(private router: Router) {}
  
  credenciales = {
    email: '',
    password: ''
  };

  verPassword = false;

  togglePassword() {
    this.verPassword = !this.verPassword;
  }

  iniciarSesion() {
    const { email, password } = this.credenciales;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      alert('Correo electrónico no válido.');
      return;
    }

    if (email && password) {
      this.router.navigate(['/inicio']);
    } else {
      alert('Debes completar todos los campos');
    }
  }
}