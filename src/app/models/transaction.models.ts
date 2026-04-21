export interface TransactionRequest {
  type: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
}
