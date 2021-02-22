var express = require('express');
var Movie = require('./movieModel');
var router = express.Router();

router.get('/movies', showMovieList);
//router.get('/Movie/:movieId',showMovieDetail);

function showMovieList(req,res,next){
    Movie.find({},{_id:1 , title:1}).then(function fulfilled(docs) {
        console.log('Success : ');

        var  result = {
            count : docs.length,
            data : docs
        };
        res.send(result);
    },function rejected(err){
        err.code = 500;
        next(err);
    });
}

module.exports = router;