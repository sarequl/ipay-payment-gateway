const express = require('express');

const app = express();

app.post('/createPayment', (req, res) => {
	const { amount, currency, source, description } = req.body;
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
