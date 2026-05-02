import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoginRequest } from '../../models/auth.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  showPassword = false;

  credentials: LoginRequest = {
    login: '',
    password: ''
  };

  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  feedbackTimestamp: string = '';
  showFeedback: boolean = false;


  // Injeção de dependência via construtor
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
        this.triggerFeedback('Login realizado com sucesso!', 'success');
        console.log('Login realizado com sucesso!', response);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);;
        }, 2000);
      },
      // Callback de Erro (catch)
      error: (err: any) => {
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
    'Invalid Login.': 'Login inválido.',
    'Invalid Password.': 'Senha inválida.',
    'Invalid Credentials.': 'Credenciais inválidas.',
  };

  return errorMap[backendMsg] || 'Erro ao realizar login';
}

}