const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const NoteRoutes = require('./routes/NoteRoutes.js');
//const noteModel = require('../models/NotesModel.js');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database

app.use(bodyParser.json());

app.use('/docs', NoteRoutes)


const DB_URL = "mongodb+srv://dbKhad:XsDgyaVPShvCWkqY@cluster0.ngjyla5.mongodb.net/f2023_comp3123?retryWrites=true&w=majority"

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const SERVER_PORT = process.env.PORT || 8081;
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})

