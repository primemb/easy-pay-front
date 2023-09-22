import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/payment/payment.component').then(
        (m) => m.PaymentComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'payments/verify/:gateway',
    loadComponent: () =>
      import('./pages/verify/verify.component').then((m) => m.VerifyComponent),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin/admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: 'payments',
        loadComponent: () =>
          import('./pages/admin/payments/payments.component').then(
            (m) => m.PaymentsComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
