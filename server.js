const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    function(err, database){
    if (err) {
        console.log(err)
    }  
    app.listen(3012, function() {
        console.log('API app started')
    })
})

app.get('/', function(req, res) {
    res.send('Hello there!')
})