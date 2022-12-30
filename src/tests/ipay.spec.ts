import { config } from 'dotenv';
import IpayGateway from '..';

config();

const refId: string = (Math.random() + 1).toString(36).substring(7);

describe('Ipay API', () => {
	const ipay = new IpayGateway({
		baseURL: process.env.IPAY_BASE_URL,
		apiKey: process.env.IPAY_API_KEY,
		successUrl: process.env.IPAY_SUCCESS_URL,
		failureUrl: process.env.IPAY_FAILURE_URL,
		cancelUrl: process.env.IPAY_CANCEL_URL,
	});

	it('should create a payment', async () => {
		const payment = await ipay.createPayment({
			amount: 100,
			referenceId: refId,
			description: 'Payment for something',
		});

		expect(payment).toBeDefined();
		expect(payment.message).toBeDefined();
		expect(payment.paymentUrl).toBeDefined();
		expect(payment.referenceId).toBeDefined();
		expect(payment.orderId).toBeDefined();
	});

	it('should be able to query a payment by Reference id', async () => {
		const checkStatusByRefId = await ipay.checkStatusByRefId(refId);

		console.log(checkStatusByRefId);
		expect(checkStatusByRefId).toBeDefined();
		expect(checkStatusByRefId.status).toBeDefined();
		expect(checkStatusByRefId.orderId).toBeDefined();
		expect(checkStatusByRefId.orderAmount).toBe(100);
	});

	it('should be able to query a payment by OrderId', async () => {
		const checkStatusByRefId = await ipay.checkStatusByOrderId('ZLLTF104-504854D1806C5');

		expect(checkStatusByRefId).toBeDefined();
		expect(checkStatusByRefId.status).toBeDefined();
		expect(checkStatusByRefId.orderId).toBeDefined();
		expect(checkStatusByRefId.orderAmount).toBe(100);
	});
});
