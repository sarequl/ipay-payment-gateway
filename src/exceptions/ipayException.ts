export class IpayException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'IpayException';
		this.stack = this.stack ?? new Error().stack;
	}
}
