var express = require('express');
var app = express();
var mongodb = require('mongodb');

// mlab url for mongo database
var dburl = process.env.MONGO_DB;

app.use(express.static('public'));

// Beginning of routing section
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/new_recipe/', function(req, response) {
  var MC = mongodb.MongoClient;
  var title = req.title;
  var author = req.author;
  var cooktime = req.cooktime;
  var body = req.body;
  console.log("enter");
  MC.connect(dburl, function (err, client) {
    if (err) 
      console.log("error")
    else {
      var collection = client.db.collection('recipes');
      console.log("eyyy");
    }
  });
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
