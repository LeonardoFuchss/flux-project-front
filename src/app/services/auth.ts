import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root' // Torna o serviço um Singleton
})
export class AuthService {

  // URL do Backend
  private apiUrl = 'http://localhost:8080/auth/login'; 

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Converte o JSON para o objeto
    return this.http.post<LoginResponse>(`${this.apiUrl}`, credentials).pipe(
      // O 'tap' é um operador que permite "espiar" a resposta sem modificá-la (side-effect)
      tap(response => {
        // Aqui salvamos o Token no "HD" do navegador
        // É menos seguro que HttpOnly Cookies, mas para MVP é o padrão
        localStorage.setItem('token', response.token);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  // Método utilitário para saber se está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Retorna true se o token existir
  }
}
