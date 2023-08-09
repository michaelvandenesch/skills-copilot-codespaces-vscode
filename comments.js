//create web server
var express = require('express');
var router = express.Router();
//create database
var mongojs = require('mongojs');
var db = mongojs('commentdb', ['commentdb']);
//get all comments
router.get('/comments', function (req, res, next) {
    db.commentdb.find(function (err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});
//get single comment
router.get('/comment/:id', function (req, res, next) {
    db.commentdb.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});
//save comment
router.post('/comment', function (req, res, next) {
    var comment = req.body;
    if (!comment.name || !(comment.comment + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else {
        db.commentdb.save(comment, function (err, comment) {
            if (err) {
                res.send(err);
            }
            res.json(comment);
        });
    }
});
//delete comment
router.delete('/comment/:id', function (req, res, next) {
    db.commentdb.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});
//update comment
router.put('/comment/:id', function (req, res, next) {
    var comment = req.body;
    var updcomment = {};
    if (comment.name) {
        updcomment.name = comment.name;
    }
    if (comment.comment) {
        updcomment.comment = comment.comment;
    }
    if (!updcomment) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else {
        db.commentdb.update({ _id: mongojs.ObjectId(req.params.id) }, updcomment, {}, function (err, comment) {
            if (err) {
                res.send(err);
            }
            res.json(comment);
        });
    }
});
module.exports = router;
//# sourceMappingURL=comments.js.map