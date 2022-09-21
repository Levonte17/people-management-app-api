// require dependenices
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
// initialize the express app
const app = express();
// configuring application settings

require('dotenv').config();

const {
    $PORT = 4000, DATABASE_URL
} = process.env;

// establish connection to mongodb
mongoose.connect(DATABASE_URL);

mongoose.connection
    .on('connected', () => console.log('Connected to MongoDB'))
    .on('disconnected', () => console.log('Disconnected from MongoDB'))
    .on('error', (error) => console.log('Problem with MongoDB: ' + error.message));

// set up our model
const peopleSchema = new mongoose.Schema({
    name: String,
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
    },
    title: String,
}, {
    timestamps: true
});

const People = mongoose.model('People', peopleSchema);

// mount middleware
// app.use(express.urlencoded({ extended: false })) // intercepts incoming form data and turns it into req.body
app.use(express.json());
// ^ this middleware intercepts incoming json request bodies and turns them into req.body
app.use(logger('dev'));

app.use(cors()); // this sets the access-control-allow-origin to *
// this means that all domains can request data from this server
// without getting blocked by the browser
// mount our routes
app.get('/', (req, res) => {
    res.send('Welcome to the People Management App');
});

// FULL CRUD ROUTES

// INDEX Route
app.get('/api/people', async (req, res) => {
    try {
        res.status(200).json(await People.find({}));
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'error': 'bad request'
        });
    }
});


// CREATE Route
app.post('/api/people', async (req, res) => {
    try {
        res.status(201).json(await People.create(req.body));
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'error': 'bad request'
        });
    }
});


// UPDATE Route
app.put('/api/people/:id', async (req, res) => {
    try {
        res.status(200).json(await People.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true
            }
        ));
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'error': 'bad request'
        });
    }
});

// DELETE Route
app.delete('/api/people/:id', async (req, res) => {
    try {
        res.status(200).json(await People.findByIdAndDelete(
            req.params.id
        ));
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'error': 'bad request'
        });
    }
});


// Test Route to see how a MERN Stack App works
app.get('/api/skills', (req, res) => {
    // fake database    
    const skills = [
        {
            skill: 'JavaScript', 
            level: 5
        },
        {
            skill: 'HTML', 
            level: 5
        },
        {
            skill: 'CSS', 
            level: 5
        },
    ];
    res.status(200).json(skills);
});


// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});