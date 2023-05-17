import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from './payment.service';
import { NgForm } from '@angular/forms';
import { IPaymentRequest } from './payment.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('paymentForm') signupForm: NgForm;
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
    const data = this.signupForm.value;
    this.loading = true;
    const payload: Omit<IPaymentRequest, 'backurl'> = {
      amount: data.amount,
      description: data.description,
      email: data.email,
      gateway: data.gateway,
      mobile: data.phone,
    };
    await this.paymentService.pay(payload);
  }
}
