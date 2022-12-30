import fetch from 'node-fetch';

import { IHeaders } from '../interfaces/headers.interface';
import { IpayException } from '../exceptions/ipayException';

interface IPayload {
	[key: string]: unknown;
}

export async function get<T>(url: string, additionalHeaders: IHeaders): Promise<T> {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Accept: 'application/json',
			...additionalHeaders,
		},
	});
	const parsed = await response.json();
	if (parsed.errorMessage) throw new IpayException(parsed.errorMessage);
	return parsed;
}

export async function post<T>(url: string, payload: IPayload = {}, additionalHeaders: IHeaders): Promise<T> {
	const response = await fetch(url, {
		headers: {
			'content-type': 'application/json',
			Accept: 'application/json',
			...additionalHeaders,
		},
		body: JSON.stringify(payload),
		method: 'POST',
	});

	const parsed = await response.json();
	if (parsed.errorMessage) throw new IpayException(parsed.errorMessage);
	return parsed;
}
