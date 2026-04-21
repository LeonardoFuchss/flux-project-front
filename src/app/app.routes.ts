import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { MainLayoutComponent } from './main-layout-component/main-layout-component';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SignupComponent } from './pages/signup/signup';
import { TransactionComponent } from './pages/transaction/transaction';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'login', 
        component: LoginComponent 
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { 
        path: 'signup', 
        component: SignupComponent 
      },
      { 
        path: 'transaction',
        component: TransactionComponent
      },
      { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
      }
    ]
  }
];