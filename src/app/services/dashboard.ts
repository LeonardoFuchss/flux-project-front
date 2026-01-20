import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';


export interface IDBTransaction {
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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
  }

  getTotalIncomes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/summary/total-income`, { headers: this.getHeaders() });
  }

  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/summary/total-expense`, { headers: this.getHeaders() });
  }

  getCurrentBalance(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/summary/current-balance`, { headers: this.getHeaders() });
  }  

  getAllTransactions(): Observable<IDBTransaction[]> {
  return this.http.get<IDBTransaction[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
}
}