const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/api/authenticate', (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);
  res.json({ received: true, message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});