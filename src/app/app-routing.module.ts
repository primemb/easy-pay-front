import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: 'payments/verify/:gateway',
    loadChildren: () =>
      import('./pages/verify/verify.module').then((m) => m.VerifyModule),
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
