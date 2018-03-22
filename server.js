var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

const port = 3000;

var app = express();

//setting middleware
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
app.use(bodyParser.json());

app.post('/login', function(req, res) {
    fs.readFile(path.join(__dirname + '/public/json/credentials.json'), 'utf8', function (err, data) {
        if (err) return res.status(500).send();
        var users = JSON.parse(data);
        for(var i = 0; i < users.length; i++) {
            if(users[i].email === req.body.email && users[i].password === req.body.password) {
                return res.status(200).send({
                    user: users[i]
                })
            }
        }
        return res.status(404).send({message: 'User not found'});
    });
});

app.get('/users/:id', function(req, res) {
    fs.readFile(path.join(__dirname + '/public/json/sample.json'), 'utf8', function (err, data) {
        if (err) return res.status(500).send();
        var sampleArray = JSON.parse(data);
        var collection = sampleArray.filter(function(data) {
            return data.id === req.params.id;
        });
        if(collection.length) return res.send(collection);
        return res.status(404).send({message: 'Data not found'});
    });
});

app.get('/users', function(req, res) {
    fs.readFile(path.join(__dirname + '/public/json/sample.json'), 'utf8', function (err, data) {
        if (err) return res.status(500).send();
        var sampleArray = JSON.parse(data);
        res.send(sampleArray);
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(process.env.PORT || port, function(err) {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('server is listening on ' + port)
});