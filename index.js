
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
var app = express()
 
app.use(cors())

require('dotenv').config();

const path = require('path') //other imports

mongoose.connect(process.env.REACT_APP_MONGODB_URI, { useNewUrlParser: true });

//mongoose.connect('mongodb+srv://ashwini:ashwini@cluster0.tpflx.mongodb.net/mydb?retryWrites=true&w=majority'); //mongodb://localhost/mydb
mongoose.Promise = global.Promise;



app.get('/api', (req, res) => res.send({text:'text'}));

app.use(express.static(path.join(__dirname, "client", "build")))//other middleware


app.use(express.static('public'));

app.use(express.json());


// initialize routes
app.use('/api',require('./routes/api'));

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 8088, function(){ //port
    console.log('now listening for requests');

});

 
