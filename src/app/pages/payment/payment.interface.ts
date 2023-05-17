export interface IPaymentResponse {
  code: string;
}

export interface IPaymentRequest {
  gateway: string;
  amount: number;
  description: string;
  email: string;
  mobile: string;
  backurl: string;
}
