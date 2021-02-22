var express = require('express');
var Movie = require('./movieModel');
var router = express.Router();

//Search list
router.get('/movies', showMovieList);
router.get('/movies2', showMovieList2);

//Search Id
router.get('/movies/:movieId',showMovieDetail);

//add Movie
router.post('/movies' , addMovie);

//update Movie
router.post('/movies/:movieId' , updateMovie);

//DeleteMovie
router.delete('/movies/:movieId',deleteMovie);

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

///////////////////////
function showMovieDetail(req,res,next){
    var movieId = req.params.movieId;
    Movie.findById(movieId).exec((err,doc)=>{
        if(err){
            err.code = 500;
            next(err);
        }
        else
        {
            console.log('Success : ');
            res.send(doc);
        } 
    });
}


function addMovie(req, res , next ){
    var title = req.body.title;
    var director = req.body.director;
    var year = parseInt(req.body.year);

    var movie = new Movie({title:title , director:director, year:year});
    movie.save((err,doc) =>{
        if(err){
            err.code = 500
            next(err);
        }
        else{
            console.log(doc);
            res.send({msg:'success'});
        }
    });
}

function updateMovie(req, res , next ){
    var movieId = req.params.movieId;
    var title = req.body.title;
    var director = req.body.director;
    var year = parseInt(req.body.year);
    var movie = new Movie({title:title , director:director, year:year});

    movie.update({_id:movieId},{$set:{
            title : title,
            director:director,
            year: year
        }},(err,doc) =>{
        if(err){
            err.code = 500
            next(err);
        }
        else{
            console.log(doc);
            res.send({msg:'success'});
        }
    });
}

function deleteMovie(req , res , next){
    var movieId = req.params.movieId;
    Movie.remove({_id:movieId}).exec((err, doc)=>{
        if(err){
            err.code = 500;
            next(err)
        }
        else{
            console.log(doc);
            res.send({msg:'success'});
        }
    });
}


module.exports = router;