const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes - MUST come before static files
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' }); // Ensure JSON response
});

// Serve static files from React
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// All other requests return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});