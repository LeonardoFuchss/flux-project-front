import { Component } from '@angular/core';
import { TransactionRequest } from '../../models/transaction.models';
import { TransactionService } from '../../services/transaction';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css',
})
export class TransactionComponent {

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

    constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

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

  // Método para selecionar (caso não queira usar ngModel direto no loop)
  selectCategory(categoryValue: string) {
    this.credentials.category = categoryValue;
  }

   onSubmit() {
    this.transactionService.createTransaction(this.credentials).subscribe({
      // Callback de Sucesso
      next: (response: any) => {
        // 1. Mostra o feedback visual
        this.triggerFeedback('Transação salva com sucesso!', 'success');
        
        // 2. Espera 2 segundos (2000ms) antes de mudar de página
        setTimeout(() => {
            this.router.navigate(['/dashboard']); 
        }, 2000);
      },

      // Callback de Erro
      error: (errorObj) => {
        // Log para você investigar o que está vindo exatamente no console do navegador
        console.log('Erro completo:', errorObj);

        // Tentativa robusta de pegar a mensagem de erro
        const msg = errorObj.error?.message || errorObj.error || 'Erro desconhecido ao salvar.';
        
        this.triggerFeedback(msg, 'error');
      }
    });
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
