import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SignupRequest } from '../models/signup.models';

@Injectable({
  providedIn: 'root' // Torna o serviço um Singleton
})
export class SignupService {

  // URL do Backend
  private apiUrl = 'http://localhost:8080/auth/signup'; 

  constructor(private http: HttpClient) { }

  signup(credentials: SignupRequest): Observable<SignupRequest> {
    // Converte o JSON para o objeto
    return this.http.post<SignupRequest>(`${this.apiUrl}`, credentials).pipe(
 
      tap(response => {
        console.log('Usuário cadastrado com sucesso!', response);
      })
    );
  }
}
