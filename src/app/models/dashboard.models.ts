export interface DashboardData {
    totalIncomes: number;
    totalExpenses: number;
    currentBalance: number;
    allTransactions: IDBTransaction[];
}