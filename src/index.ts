import { IpayException } from './exceptions/ipayException';
import { IHeaders } from './interfaces/headers.interface';
import { IpayCreatePayment } from './interfaces/createPayment.interface';
import { IpayCheckStatusResponse, IpayCreatePaymentResponse } from './interfaces/ipayResponse.interface';
import { IpayConstructor } from './interfaces/main.interface';
import { post, get } from './utils/request';

export class IpayGateway {
	private readonly apiKey: string;
	private readonly baseURL: string;
	private successUrl!: string;
	private failureUrl!: string;
	private cancelUrl!: string;

	/**
	 *
	 * @param config config object required by the `ipay-payment-gateway` package
	 * @example
	 * ```
	 * const ipayConfig = {
	 *   baseURL: 'https://demo.ipay.com.bd/api/pg',
	 *   apiKey: 'abcdxxxxxxxxxxxxxx',
	 *   successUrl: 'https://example.com/success',
	 *   failureUrl: 'https://example.com/failure',
	 *   cancelUrl: 'https://example.com/cancel',
	 * }
	 * const ipay = new IpayGateway(ipayConfig)
	 * ```
	 *
	 */
	constructor(config: IpayConstructor) {
		if (Object.keys(config).length !== 5) throw new IpayException('Invalid Configuration provided');
		this.validateConfig(config);

		const { apiKey, baseURL, successUrl, failureUrl, cancelUrl } = config;

		this.apiKey = apiKey;
		this.baseURL = baseURL;
		this.successUrl = successUrl;
		this.failureUrl = failureUrl;
		this.cancelUrl = cancelUrl;
	}

	/**
	 * Start the initial payment request
	 *
	 * @param paymentDetails Information required to start a payment flow
	 *
	 * @returns Promise of Ipay Create payment Response
	 * @example
	 * ```
	 * const result = await ipay.createPayment({
	 *   amount: 100,
	 *   referenceId: 'RefXXXX',
	 *   description: 'Payment for something',
	 *   successUrl: 'https://example.com/success',
	 *   failureUrl: 'https://example.com/failure',
	 *   cancelUrl: 'https://example.com/cancel',
	 * });
	 * ```
	 */
	public createPayment = async (paymentDetails: IpayCreatePayment): Promise<IpayCreatePaymentResponse> => {
		const { amount, referenceId, description, successUrl, failureUrl, cancelUrl } = paymentDetails;

		const payload = {
			amount,
			referenceId,
			description,
			successCallbackUrl: successUrl || this.successUrl,
			failureCallbackUrl: failureUrl || this.failureUrl,
			cancelCallbackUrl: cancelUrl || this.cancelUrl,
		};

		const headers: IHeaders = {
			Authorization: `Bearer ${this.apiKey}`,
		};
		return await post<IpayCreatePaymentResponse>(`${this.baseURL}/order`, payload, headers);
	};

	/**
	 * Check payment status by order id
	 *
	 * @param orderId Information required to start a payment flow
	 *
	 * @returns Promise of Ipay Check payment Status Response
	 * @example
	 * ```
	 * const result = await ipay.checkStatusByOrderId('OrderXXXX');
	 * ```
	 */
	public checkStatusByOrderId = async (orderId: string): Promise<IpayCheckStatusResponse> => {
		const headers: IHeaders = {
			Authorization: `Bearer ${this.apiKey}`,
		};

		return await get<IpayCheckStatusResponse>(`${this.baseURL}/order/${orderId}/status`, headers);
	};

	/**
	 * Check payment status by Reference id
	 *
	 * @param refId Information required to start a payment flow
	 *
	 * @returns Promise of Ipay Check payment Status Response
	 * @example
	 * ```
	 * const result = await ipay.checkStatusByRefId('RefXXXX');
	 * ```
	 */

	public checkStatusByRefId = async (refId: string): Promise<IpayCheckStatusResponse> => {
		const headers: IHeaders = {
			Authorization: `Bearer ${this.apiKey}`,
		};

		return await get<IpayCheckStatusResponse>(`${this.baseURL}/order/referenceId/${refId}/status`, headers);
	};

	/**
	 * @description Validates the config object
	 * @param config
	 */
	private validateConfig = (config: IpayConstructor): void => {
		const { baseURL, apiKey, successUrl, failureUrl, cancelUrl } = config;

		if (!baseURL || baseURL === '') throw new IpayException('Invalid BaseURL provided');
		if (!apiKey || apiKey === '') throw new IpayException('Invalid API Key provided');
		if (!successUrl || successUrl === '') throw new IpayException('Invalid successCallbackUrl provided');
		if (!failureUrl || failureUrl === '') throw new IpayException('Invalid API failureCallbackUrl provided');
		if (!cancelUrl || cancelUrl === '') throw new IpayException('Invalid API cancelCallbackUrl provided');
	};
}

export default IpayGateway;
