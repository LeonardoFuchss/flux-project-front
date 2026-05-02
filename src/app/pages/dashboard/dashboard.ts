import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../services/dashboard';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();

  months = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Fev' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Abr' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Ago' },
    { value: 9, label: 'Set' },
    { value: 10, label: 'Out' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dez' }
  ];

  dashboardData = {
    incomes: 0,
    expenses: 0,
    balance: 0,
    history: [] as any[]
  };

  isLoading = true;
  username: string = 'Usuário';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  onFilterChange() {
    this.isLoading = true;
    this.carregarDashboardCompleto();
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.carregarDashboardCompleto();
  }

  carregarDashboardCompleto() {
    forkJoin({
      incomes: this.dashboardService.getTotalIncomes(this.selectedMonth, this.selectedYear),
      expenses: this.dashboardService.getTotalExpenses(this.selectedMonth, this.selectedYear),
      balance: this.dashboardService.getCurrentBalance(this.selectedMonth, this.selectedYear),
      history: this.dashboardService.getAllTransactions(this.selectedMonth, this.selectedYear)
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

  editItem(item: any) {
      this.router.navigate([`/transaction/${item.id}/edit`]);
}

deleteItem(id: number) {
  this.dashboardService.deleteTransaction(id).subscribe({
    next: () => {
      this.triggerFeedback('Transação deletada com sucesso!', 'success');
      this.dashboardData.history = this.dashboardData.history.filter(t => t.id !== id);
      setTimeout(() => {window.location.reload()}, 2000);
    },
    error: (err) => {
      console.error('Erro ao deletar', err);
    }
  });
}

// Feedback para ações como login, edição, exclusão
triggerFeedback(message: string, type: 'success' | 'error') {
    this.feedbackMessage = message;
    this.feedbackType = type;
    this.feedbackTimestamp = new Date().toLocaleTimeString();
    this.showFeedback = true;

    setTimeout(() => {
      this.showFeedback = false;
    }, 2000);
  }

  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  feedbackTimestamp: string = '';
  showFeedback: boolean = false;


}