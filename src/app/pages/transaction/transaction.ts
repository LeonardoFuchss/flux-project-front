import { Component } from '@angular/core';
import { TransactionRequest } from '../../models/transaction.models';
import { TransactionService } from '../../services/transaction';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css',
})
export class TransactionComponent {

 constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  isEditMode: boolean = false; // Para diferenciar entre criação e edição
  transactionId: string | null = null; // Para armazenar o ID da transação em edição

  ngOnInit() {
  this.transactionId = this.route.snapshot.paramMap.get('id');

  if (this.transactionId) {
    this.isEditMode = true;
    this.loadTransaction(this.transactionId);
  }
}

loadTransaction(id: string) {
  this.transactionService.getTransactionById(id).subscribe({
    next: (data) => {
      this.credentials = data;
    },
    error: (err) => {
      console.error('Erro ao carregar transação', err);
    }
  });
}


  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  feedbackTimestamp: string = '';
  showFeedback: boolean = false;

  credentials: TransactionRequest = {
      type: '',
      amount: 0,
      description: '',
      date: new Date(),
      category: ''
    };

    
    errorMessage = '';


  categories = [
    { value: 'FOOD', label: 'Alimentação' },
    { value: 'TRANSPORTATION', label: 'Transporte' },
    { value: 'HOUSING', label: 'Moradia' },
    { value: 'HEALTH', label: 'Saúde' },
    { value: 'EDUCATION', label: 'Educação' },
    { value: 'LEISURE', label: 'Lazer' },
    { value: 'SHOPPING', label: 'Compras' },
    { value: 'UTILITIES', label: 'Contas/Util.' },
    { value: 'SALARY', label: 'Salário' },
    { value: 'INVESTMENTS', label: 'Investimentos' },
    { value: 'GIFT', label: 'Presentes' },
    { value: 'OTHERS', label: 'Outros' }
  ];

  // Método para selecionar
  selectCategory(categoryValue: string) {
    this.credentials.category = categoryValue;
  }

   onSubmit() {
  if (this.isEditMode && this.transactionId) {
    this.transactionService.updateTransaction(this.transactionId, this.credentials).subscribe({
      next: () => {
        this.triggerFeedback('Transação atualizada com sucesso!', 'success');
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.triggerFeedback('Erro ao atualizar transação', 'error');
      }
    });
  } else {
    this.transactionService.createTransaction(this.credentials).subscribe({
      next: () => {
        this.triggerFeedback('Transação criada com sucesso!', 'success');
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.triggerFeedback('Erro ao criar transação', 'error');
      }
    });
  }
}
  triggerFeedback(message: string, type: 'success' | 'error') {
    this.feedbackMessage = message;
    this.feedbackType = type;
    this.feedbackTimestamp = new Date().toLocaleTimeString(); // Hora atual
    this.showFeedback = true;

    // Ocultar automaticamente após 4 segundos
    setTimeout(() => {
      this.showFeedback = false;
    }, 4000);
  }
}
