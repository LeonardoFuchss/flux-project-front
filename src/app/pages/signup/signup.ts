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

  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  feedbackTimestamp: string = '';
  showFeedback: boolean = false;

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
      next: (response: any) => {
        this.triggerFeedback('Cadastro realizado com sucesso!', 'success');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (err: any) => {
        console.error('Erro ao cadastrar', err);

        const msg = this.mapErrorMessage(err);
        this.triggerFeedback(msg, 'error');
      }
    });
  }
   triggerFeedback(message: string, type: 'success' | 'error') {
    this.feedbackMessage = message;
    this.feedbackType = type;
    this.feedbackTimestamp = new Date().toLocaleTimeString();
    this.showFeedback = true;

    setTimeout(() => {
      this.showFeedback = false;
    }, 4000);
  }

  private mapErrorMessage(err: any): string {
  const backendMsg = err.error?.message || err.error || '';

  const errorMap: Record<string, string> = {
    'This user login is already in use. Please try again!': 'Usuário já existe',
    'Invalid credentials': 'Credenciais inválidas',
    'The passwords do not match. Try again!':'As senhas não conferem.',
    'Password too weak': 'Senha muito fraca'
  };

  return errorMap[backendMsg] || 'Erro ao realizar cadastro';
}
}
