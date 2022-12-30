export interface IpayCreatePayment {
	amount: number;
	referenceId?: string;
	description?: string;
	successUrl?: string;
	failureUrl?: string;
	cancelUrl?: string;
}
