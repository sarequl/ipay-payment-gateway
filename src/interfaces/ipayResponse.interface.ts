export interface IpayCreatePaymentResponse {
	message: string;
	referenceId: string;
	orderId: string;
	paymentUrl: string;
}

export interface IpayCheckStatusResponse {
	statusCode?: number;
	status: string;
	orderId: string;
	referenceId: string;
	orderAmount: number;
	transactionId?: string;
	transactionTime?: string;
}
