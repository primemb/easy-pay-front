import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PaymentComponent }]),
  ],
  providers: [PaymentService],
})
export class PaymentModule {}
