import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TransactionRequest } from '../models/transaction.models';

@Injectable({
  providedIn: 'root' // Torna o serviço um Singleton
})
export class TransactionService {

  // URL do Backend
  private apiUrl = 'http://localhost:8080/transactions'; 

  constructor(private http: HttpClient) { }

  createTransaction(transaction: TransactionRequest): Observable<TransactionRequest> {
    // Converte o JSON para o objeto
    return this.http.post<TransactionRequest>(`${this.apiUrl}`, transaction).pipe(

      tap(response => {
        console.log('Transação criada com sucesso!', response);
      })
    );
  }
  getTransactionById(id: string) {
  return this.http.get<TransactionRequest>(`${this.apiUrl}/${id}`);
}

updateTransaction(id: string, data: TransactionRequest) {
  return this.http.patch(`${this.apiUrl}/${id}`, data);
}
}
