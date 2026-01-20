import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
// AJUSTE 1: Verifique se o nome do arquivo é dashboard.service.ts
import { DashboardService } from '../../services/dashboard'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css', // ou styleUrls: ['./dashboard.css'] dependendo da versão
})
// AJUSTE 2: Adicione "implements OnInit"
export class DashboardComponent implements OnInit {

  dashboardData = {
    incomes: 0,
    expenses: 0,
    balance: 0,
    history: [] as any[]
  };

  isLoading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.carregarDashboardCompleto();
  }

  carregarDashboardCompleto() {
    forkJoin({
      incomes: this.dashboardService.getTotalIncomes(),
      expenses: this.dashboardService.getTotalExpenses(),
      balance: this.dashboardService.getCurrentBalance(),
      history: this.dashboardService.getAllTransactions()
    }).subscribe({
      next: (result) => {
        this.dashboardData.incomes = result.incomes;
        this.dashboardData.expenses = result.expenses;
        this.dashboardData.balance = result.balance;
        this.dashboardData.history = result.history;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar dashboard', err);
        this.isLoading = false;
      }
    });
  }
}