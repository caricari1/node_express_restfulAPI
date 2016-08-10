var express = require('express')
var app = express(); // creating an express app
var path = require('path');
var PORT = process.env.PORT || 3000;
var middleware = require('./middleware')


//app.use(middleware.requireAuthentication); // This middlware is now for the whole app

app.get('/', function(req, res){
  res.send('<h1>Express Todo API </h1>')
})

app.get('/about', middleware.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log('Listening on PORT ' + PORT)
})
