export interface IPaymentResponse {
  _id: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  gateway: string;
  gatewayId: string;
  paymentUrl: string;
  backurl: string;
  uniqueId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentRequest {
  gateway: string;
  amount: number;
  description: string;
  email: string;
  mobile: string;
  backurl: string;
}
