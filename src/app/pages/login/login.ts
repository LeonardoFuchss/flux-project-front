import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoginRequest } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  showPassword = false;

  credentials: LoginRequest = {
    login: '',
    password: ''
  };

  errorMessage = ''; // Para mostrar erro na tela se falhar

  // Injeção de dependência via construtor (igual ao Spring)
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      // Callback de Sucesso (try)
      next: (response: any) => {
        console.log('Login realizado com sucesso!', response);
        this.router.navigate(['/dashboard']); // Redireciona para a home
      },
      // Callback de Erro (catch)
      error: (err: any) => {
        console.error('Erro ao logar', err);
        this.errorMessage = 'Email ou senha inválidos';
      }
    });
  }

}