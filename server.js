// require dependenices
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
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

// set up our model
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
}, { timestamps: true });

const People = mongoose.model('People', peopleSchema);

// mount middleware
// app.use(express.urlencoded({ extended: false })) // intercepts incoming form data and turns it into req.body
app.use(express.json()); 
// ^ this middleware intercepts incoming json request bodies and turns them into req.body
app.use(logger('dev'));
// mount our routes
app.get('/', (req, res) => {
    res.send('Welcome to the People Management App');
});

// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});