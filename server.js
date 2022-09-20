// require dependenices
const express = require('express');
const mongoose = require('mongoose');
// initialize the express app
const app = express();
// configuring application settings

require('dotenv').config();

const { PORT = 4000, DATABASE_URL } = process.env;

// establish connection to mongodb
mongoose.connect(DATABASE_URL);

mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('disconnected', () => console.log('Disconnected from MongoDB'))
.on('error', (error) => console.log('Problem with MongoDB: ' + error.message));

// mount middleware

// mount our routes
app.get('/', (req, res) => {
    res.send('Welcome to the People Management App');
});

// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});