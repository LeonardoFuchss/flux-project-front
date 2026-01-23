import { Component } from '@angular/core';
import { SignupRequest } from '../../models/signup.models';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
 showPassword = false;

  credentials: SignupRequest = {
    login: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage = ''; // Para mostrar erro na tela se falhar

  // Injeção de dependência via construtor (igual ao Spring)
  constructor(
    private signupService: SignupService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.signupService.signup(this.credentials).subscribe({
      // Callback de Sucesso (try)
      next: (response: any) => {
        console.log('Cadastro realizado com sucesso!', response);
        this.router.navigate(['/login']); // Redireciona para a home
      },
      // Callback de Erro (catch)
      error: (err: any) => {
        console.error('Erro ao cadastrar', err);
        this.errorMessage = 'Login ou senha inválidos';
      }
    });
  }
}
