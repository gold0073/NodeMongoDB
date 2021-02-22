var express = require('express');
var Movie = require('./movieModel');
var router = express.Router();

router.get('/movies', showMovieList);
router.get('/movies2', showMovieList2);

//router.get('/Movie/:movieId',showMovieDetail);

//Find Type1
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

//Find Type2 
function showMovieList2(req,res,next){
    Movie.find( {}, {_id:1 , title:1} , (err,docs) =>{
        if(err){
            err.code = 500;
            next(err);
        }
        else
        {
            console.log('Success : ');

            var  result = {
                count : docs.length,
                data : docs
            };
            res.send(result);
        } 
    });
}

module.exports = router;