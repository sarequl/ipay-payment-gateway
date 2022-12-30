# ipay-payment-gateway

Nodejs library to accept ipay (ipay.com.bd) payments on your backend application

![CodeQL](https://github.com/sarequl/ipay-payment-gateway/workflows/CodeQL/badge.svg)
![Test for linting and formatting](https://github.com/sarequl/ipay-payment-gateway/workflows/Test%20for%20linting%20and%20formatting/badge.svg)
![Publish to NPM and Github Packages](https://nodei.co/npm/ipay-payment-gateway.png?mini=true)

## Features

- Implements all the methods required to get accepted as a merchant on ipay
- Written in typescript
- Get intellisense in when interacting with the library `vscode`
- Get Documentation and examples right inside your code editor `vscode`
- Get ipay Response Intellisense
- Get Human Readable exceptions when some error response is returned from ipay `in progress`

---

# How to use

## Installing the library

### `npm`

> `npm install ipay-payment-gateway`

### `yarn`

> `yarn add ipay-payment-gateway`

---

## Initializing the library

### `javascript`

> file `ipay.js`

```javascript
const IpayGateway = require('ipay-payment-gateway');

const ipayConfig = {
	baseURL: 'https://demo.ipay.com.bd/api/pg', //do not add a trailing slash
	key: 'abcxxxxxxxxxxxxxx',
	successUrl: 'https://example.com/success',
	failureUrl: 'https://example.com/failure',
	cancelUrl: 'https://example.com/cancel',
};

const ipay = new IpayGateway(ipayConfig);
module.exports = ipay;
```

### `typescript`

> file `ipay.ts`

```typescript
import IpayGateway, { IpayConstructor } from 'ipay-payment-gateway';

const ipayConfig: IpayConstructor = {
	//get intellisense here
	baseURL: 'https://demo.ipay.com.bd/api/pg', //do not add a trailing slash
	key: 'abcxxxxxxxxxxxxxx',
	successUrl: 'https://example.com/success',
	failureUrl: 'https://example.com/failure',
	cancelUrl: 'https://example.com/cancel',
};

const ipay = new IpayGateway(ipayConfig);
export default ipay;
```

---

## Create a payment

```javascript
const paymentRequest = {
	amount: 1000,
	referenceId: 'Ref-abcxxxx',
	description: 'Payment for something',
	successUrl: 'https://example.com/success', //optional
	failureUrl: 'https://example.com/failure', //optional
	cancelUrl: 'https://example.com/cancel', //optional
};

//optional - you can set a different URL. Else it will use the main config URL.

const result = await ipay.createPayment(paymentRequest);
console.log(result);
```

---

## Check payment status by Reference ID

```javascript
const result = await ipay.checkStatusByRefId('<Reference ID you have passed while creating the order.>');
```

---

## Search Transaction

```javascript
const result = await ipay.checkStatusByOrderId('Order ID returned by ipay');
```

---

### Contributing

- Please Follow the code style and use the prettier config and eslint config provided in the repository
- Feel free to open `issues` or `pull request` for any issues and bugfixes
- If you want to implement new features or write documentation about existing features feel free to do it as well
- To see a list of missing features or to-do's, please visit the `project` section of the github repository

---

### License

> MIT

> DISCLAIMER: This software comes with absolutely no warranty and is not affiliated with the company **`ipay (ipay.com.bd)`** in any way. Use at your own risk. Author and Contributors are not responsible for any financial damages, outages etc.

### Author

[Sarequl Basar](https://github.com/sarequl)
