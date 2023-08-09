//create web server
var express = require('express');
//create a router object
var router = express.Router();
//import the model
var Comment = require('../models/comment');
//import the auth middleware
var auth = require('../middleware/auth');

//import the auth middleware
var auth = require('../middleware/auth');

//GET /comments
router.get('/', auth, function(req, res, next){
    //use the Comment model to fetch a list of comments from the database
    Comment.find(function(err, comments){
        if(err){
            console.log(err);
            res.end(err);
            return;
        }
        //no error so send the comments to the index view
        res.render('comments/index',{
            comments: comments,
            user: req.user
        });
    });
});

//GET /comments/add
router.get('/add', auth, function(req, res, next){
    res.render('comments/add', {
        user: req.user
    });
});

//POST /comments/add
router.post('/add', auth, function(req, res, next){
    Comment.create({
        content: req.body.content,


