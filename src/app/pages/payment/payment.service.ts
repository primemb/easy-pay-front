import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IPaymentRequest, IPaymentResponse } from './payment.interface';
@Injectable()
export class PaymentService {
  constructor(private readonly httpClient: HttpClient) {}

  async getGateways() {
    return await lastValueFrom(
      this.httpClient.get<string[]>(
        `${environment.apiUrl}/payments/get-gateways`
      )
    );
  }

  async pay(data: Omit<IPaymentRequest, 'backurl'>) {
    return await lastValueFrom(
      this.httpClient.post<IPaymentResponse>(`${environment.apiUrl}/payments`, {
        ...data,
        backurl: `${environment.siteUrl}/payments/verify/${data.gateway}`,
      })
    );
  }
}
