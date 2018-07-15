// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongodb = require('mongodb');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/', function(req, response) {
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
