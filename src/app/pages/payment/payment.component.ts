import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from './payment.service';
import { FormsModule, NgForm } from '@angular/forms';
import { IPaymentRequest } from './payment.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [PaymentService],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('paymentForm') paymentForm: NgForm;
  loading = false;
  error = false;
  gateways: string[] = [];

  constructor(private readonly paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loading = true;
    this.paymentService
      .getGateways()
      .then((gateways) => (this.gateways = gateways))
      .catch(() => (this.error = true))
      .finally(() => (this.loading = false));
  }

  async onSubmit() {
    const data = this.paymentForm.value;
    this.loading = true;
    const payload: Omit<IPaymentRequest, 'backurl'> = {
      amount: data.amount,
      description: data.description,
      email: data.email,
      gateway: data.gateway,
      mobile: data.phone,
    };
    try {
      const response = await this.paymentService.pay(payload);
      window.location.href = response.paymentUrl;
    } catch (e) {
      console.log(e);
    }
  }
}
