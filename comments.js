// Create web server
const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
//create server
const server = http.createServer(app);
//listen on port
server.listen(port);
//use body parser
app.use(bodyParser.urlencoded({ extended: false }));
//use static files
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/comments', function(req, res) {
    fs.readFile(__dirname + '/data/comments.json', function(err, data) {
        res.end(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile(__dirname + '/data/comments.json', function(err, data) {
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(__dirname + '/data/comments.json', JSON.stringify(comments), function(err) {
            res.end(JSON.stringify(comments));
        });
    });
});

app.delete('/comments', function(req, res) {
    fs.readFile(__dirname + '/data/comments.json', function(err, data) {
        let comments = JSON.parse(data);
        comments.pop();
        fs.writeFile(__dirname + '/data/comments.json', JSON.stringify(comments), function(err) {
            res.end(JSON.stringify(comments));
        });
    });
});

console.log('Server running on port ' + port);