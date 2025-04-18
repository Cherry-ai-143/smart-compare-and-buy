const express = require('express');
const path = require('path');
const morgan = require('morgan'); // Importing the middleware
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/abm1db'; // Change the URI as needed
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Use morgan middleware to log requests
app.use(morgan('dev'));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
