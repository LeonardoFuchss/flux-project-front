import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../services/dashboard'; 
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class DashboardComponent implements OnInit {

  dashboardData = {
    incomes: 0,
    expenses: 0,
    balance: 0,
    history: [] as any[]
  };

  isLoading = true;

  constructor(private dashboardService: DashboardService,
  private router: Router) {   
  }

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
  isSidebarOpen = false;

  toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
 }
 logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}