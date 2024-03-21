const express = require('express');
const AuthenticationHandler = require('./Presenter/Handlers/AuthenticationHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/authenticate', (req, res) => {
    const { user } = req.body;
    console.log('Received user:', user);
    AuthenticationHandler.authenticateUser(user)
    .then((authenticatedUser) => {
        res.json({ authenticated: true, user: authenticatedUser });
      })
      .catch((error) => {
        console.error('Authentication error:', error);
        res.status(401).json({ authenticated: false, error: 'Authentication failed' });
      });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});