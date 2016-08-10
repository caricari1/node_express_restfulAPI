var express = require('express')
var app = express(); // creating an express app
var path = require('path');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
var middleware = require('./middleware')

var todos = [
  {
    id: 1,
    description: 'Teach REST API',
    completed: false
  },
  {
    id: 2,
    description: 'Eat healthy lunch',
    completed: true
  }
]

//app.use(middleware.requireAuthentication); // This middlware is now for the whole app
app.use(bodyParser());

app.get('/', function(req, res){
  res.send('<h1>Express Todo API </h1>')
})

app.get('/todos', function(req,res){
  res.json(todos)
})

app.get('/todos/:id', function(req,res){
  //creating a variable that will hold id from params object
  var todoID = parseInt(req.params.id);
  var matchedTodo;
  todos.forEach(function(todo){
    if(todoID === todo.id)
    matchedTodo = todo;
  })
    if(matchedTodo){
      res.json(matchedTodo)
    } else {
      res.status(404).send();
    }
})

app.get('/about', middleware.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log('Listening on PORT ' + PORT)
})
