var express = require('express')
var app = express(); // creating an express app
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore')

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

//add incrementer. needed for adding ID field
var todoNextID = 1;

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
  var todoId = parseInt(req.params.id);
  var matchedTodo = _.findWhere(todos, {id: todoId});
    if(matchedTodo){
      res.json(matchedTodo)
    } else {
      res.status(404).send();
    }
})

app.post('/todos', function(req, res){
  var body = req.body;
  //add id field. we're telling the program that the body id is going to equal the variable, up one after each
  body.id = todoNextID
  todoNextID ++;
  //we just parsed body with id and now we want to persist that to temporary db
  todos.push(body)

  //push body into array
  console.log('description ' + body.description);
  res.json(body)
})

app.get('/about', middleware.logger, function(req, res){
  res.send('<h1>Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log('Listening on PORT ' + PORT)
})
