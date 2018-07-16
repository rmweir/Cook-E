var express = require('express');
var app = express();
var mongodb = require('mongodb');

// mlab url for mongo database
const dburl = process.env.MONGO_DB;

app.use(express.static('public'));
app.set('view engine', 'ejs');
// Beginning of routing section

app.get('/', (req, res) => {
  const MC = mongodb.MongoClient;

  client.db('cook-e').collection('recipes').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {recipes: result})
  });
});

/*
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
*/
app.get('/new_recipe/:title/:author/:cooktime/:body/', function(req, res) {
  const MC = mongodb.MongoClient;
  const title = req.params.title;
  const author = req.params.author;
  const cooktime = req.params.cooktime;
  const body = req.params.body;
  
  MC.connect(dburl, function (err, client) {
    if (err) 
      console.log("error")
    else {
      let collection = client.db('cook-e');
      let insert = {
        recipe_create_time: Date.now(),
        recipe_title: title,
        recipe_author: author,
        recipe_cooktime: cooktime,
        recipe_body: body 
      }      

      client.db('cook-e').collection('recipes').insertOne(insert);
      res.status(200).type('txt').send(insert);
      console.log("eyyy");
    }
  });
  
});

app.get('/edit_recipe/:id/:body', function(req, res) {
  const MC = mongodb.MongoClient;
  const id = req.params.id;
  const body = req.params.body;
  
  MC.connect(dburl, function (err, client) {  
    client.db('cook-e').collection('recipes').findOneAndUpdate({recipe_create_time: parseInt(id)}, {$set: {
      recipe_body: body}}, (err, result) => {res.status(200).type('txt').send(result);});
  });
});


// listening
var listener = app.listen(process.env.PORT, function () {
  console.log('Port: ' + listener.address().port);
});
