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

app.get('/users/all/:skip/:limit', function(req, res) {
    fs.readFile(path.join(__dirname + '/public/json/credentials.json'), 'utf8', function (err, data) {
        if (err) return res.status(500).send();
        var limit = Number(req.params.limit) || 10;
        var skip = Number(req.params.skip) || 0;
        var sampleArray = JSON.parse(data);
        sampleArray = sampleArray.slice(skip, skip + limit);
        res.send(sampleArray);
    });
});

app.get('/users/:id', function(req, res) {
    fs.readFile(path.join(__dirname + '/public/json/credentials.json'), 'utf8', function (err, data) {
        if (err) return res.status(500).send();
        var sampleArray = JSON.parse(data);
        var collection = sampleArray.filter(function(data) {
            return data.id === req.params.id;
        });
        if(collection.length) return res.send(collection);
        return res.status(404).send({message: 'Data not found'});
    });
});

app.post('/users/add', function(req, res) {

    fs.readFile(path.join(__dirname + '/public/json/credentials.json'), 'utf8', function (err, data) {
        if (err) return res.status(500).send();
        var user = req.body;
        if(user.email && user.password && user.role) {
            var users = JSON.parse(data);
            users.push({
                email: user.email,
                password: user.password,
                role: user.role
            });
            var json = JSON.stringify(users);
            fs.writeFile(path.join(__dirname + '/public/json/credentials.json'), json, 'utf8', function (err, data) {
                if (err) return res.status(500).send();
                res.status(200).send({message: 'User added successfully'});
            });
        }
        else return res.status(500).send({message: 'Please fill all fields'});
    });
});

app.get('/employees/all/:skip/:limit', function(req, res) {
    fs.readFile(path.join(__dirname + '/public/json/sample.json'), 'utf8', function (err, data) {
        if (err) return res.status(500).send();
        var limit = Number(req.params.limit) || 10;
        var skip = Number(req.params.skip) || 0;
        var sampleArray = JSON.parse(data);
        sampleArray = sampleArray.slice(skip, skip + limit);
        res.send(sampleArray);
    });
});

app.get('/employees/:id', function(req, res) {
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

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(process.env.PORT || port, function(err) {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('server is listening on ' + port)
});