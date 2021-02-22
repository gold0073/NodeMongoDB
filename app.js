var express = require('express');
var app = express();

app.use(require('./movieRouter'));
app.use(handleError);

app.listen(3000);

function handleError(err , req, res, next){
    res.status(err.code).send({msg:err.message});
}