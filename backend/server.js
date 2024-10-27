// File: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://15.206.147.253:3000', // Allow only your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(express.json());

mongoose.connect("mongodb+srv://sarangchamp2004:Ic5n6vvFTRECBsFU@auth.m6sik.mongodb.net/Auth?retryWrites=true&w=majority&appName=Auth")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Expense Tracker API' });
  });


const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const port = 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
