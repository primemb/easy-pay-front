import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom, catchError, throwError } from 'rxjs';
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
      this.httpClient
        .post<IPaymentResponse>(`${environment.apiUrl}/payments`, {
          ...data,
          backurl: `${environment.siteUrl}/payments/verify/${data.gateway}`,
        })
        .pipe(catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      message = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      message = error.error.message;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(message));
  }
}
