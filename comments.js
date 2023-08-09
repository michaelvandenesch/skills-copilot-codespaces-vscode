//create web server
//create web server
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var port = 3000;
var comments = require('./routes/comments');

//connect to mongoDB
mongoose.connect('mongodb://localhost/commentDB');

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/comments', comments);

//start server
server.listen(port, function() {
  console.log('Server is listening on port ', port);
});
