import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IDBTransaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getTotalIncomes(month: number, year: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/summary/total-income?month=${month}&year=${year}`,
      { headers: this.getHeaders() }
    );
  }

  getTotalExpenses(month: number, year: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/summary/total-expense?month=${month}&year=${year}`,
      { headers: this.getHeaders() }
    );
  }

  getCurrentBalance(month: number, year: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/summary/current-balance?month=${month}&year=${year}`,
      { headers: this.getHeaders() }
    );
  }

  getAllTransactions(month: number, year: number): Observable<IDBTransaction[]> {
    return this.http.get<IDBTransaction[]>(
      `${this.apiUrl}?month=${month}&year=${year}`,
      { headers: this.getHeaders() }
    );
  }

  deleteTransaction(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}