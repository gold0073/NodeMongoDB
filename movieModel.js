require('dotenv').config();
const mongoose = require('mongoose');
var conn_url = process.env.mongodb_url

mongoose.connect( conn_url ,{
        useUnifiedTopology :  true,
        useNewUrlParser:true
    } ,(err)=> {
    if(err){
        console.log("err:" ,err);
    }else{
        console.log("connect");
    }
});

var MovieScema = mongoose.Schema({
    title       : String,
    director    : String,
    year        : Number,
    reviews     : [String]
});

var Movie = mongoose.model('Movie',MovieScema);

//////////////////////// 1
var movie1 = new Movie({
    title       :   '인터스텔라' ,
    director    :   '크리스터퍼 놀란',
    year        :   2004
});

/*
movie1.save(function(err,result,rows){
    if(err){
        console.error('Error:', err);
    }
    else{
        console.log('Success');
    }
});

//////////////////////// 2
Movie.create({title:'아바타' ,director:'제임스 카메론',year:2010}).then(function fulfilled(result){
    console.log('Success:',result);
}, function rejected(err){
    console.error('Error:' , err);
});

//////////////////////// 3
Movie.create({title:'스타워즈' ,director:'조지 루카스',year:1977}), function(err,result) {
    if(err){
        console.error('Error:' ,err);
    }else{
        console.log('Sucess' , result);
    }
};
*/