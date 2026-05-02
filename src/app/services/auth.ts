import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { Router } from '@angular/router'; // Importante para redirecionar no logout

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/login';

  // Injetar o Router é útil para mandar o usuário para o login ao expirar
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, credentials).pipe(
      tap(response => {
        // 1. Define a expiração (Agora + 2 horas em milissegundos)
        // 2 horas * 60 min * 60 seg * 1000 ms
        const expiresIn = new Date().getTime() + (2 * 60 * 60 * 1000);
        
        localStorage.setItem('token', response.token);
        const username = response.username || credentials.login;
        localStorage.setItem('username', username);
        // 2. Salva o carimbo de data/hora da expiração
        localStorage.setItem('expiration', expiresIn.toString());
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    // Redireciona para a tela de login
    this.router.navigate(['/login']); 
  }

  getUsername(): string {
    return localStorage.getItem('username') || 'Usuário';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    // Se não tiver token ou data de expiração, não está logado
    if (!token || !expiration) {
      return false;
    }

    // Verifica se o momento atual passou da data de expiração
    const now = new Date().getTime();
    if (now > parseInt(expiration)) {
      // Se expirou, forçamos o logout para limpar o lixo do localStorage
      this.logout();
      return false;
    }

    return true; // Token existe e ainda é válido (pelo relógio do navegador)
  }
}