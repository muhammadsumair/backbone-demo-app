var express = require('express');
var path = require('path');
const port = 3000;

var app = express();

//setting middleware
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(port, function(err) {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('server is listening on ' + port)
});