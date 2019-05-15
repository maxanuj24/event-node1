const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

var app = express()
app.use(cors());
// create express app

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
}); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to  application. Organize and keep track of all your notes."});
});

// listen for requests
require('./app/routes/event.routes.js')(app);

app.listen(8000, () => {
    console.log("Server is listening on port 3000");
});