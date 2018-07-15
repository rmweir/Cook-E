var express = require('express');
var app = express();
var mongodb = require('mongodb');

// mlab url for mongo database
var dburl = process.env.CONNECTION;

app.use(express.static('public'));

// Beginning of routing section
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/new_recipe/', function(req, response) {
  var MC = mongodb.MongoClient;
  var title = req.title
  var author = req.author
  var cooktime = req.cooktime
  var body = req.body

  MC.connect(dburl, function err, db) {
    if (err) 
      console.log("error")
    else {
      var collection = db.collection()
    }
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
