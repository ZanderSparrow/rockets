const express = require('express');
const request = require('request');
const app     = express();
const PORT    = 3000;

// tell our app where to serve our static files
app.use(express.static('public'));

// --------------------------------------------------------
// define a route - what happens when people visit /
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getSpacePic', function(req, res) {
  let spaceUrl = 'https://api.nasa.gov/planetary/apod?api_key=JESVwbF8yoWZVtnNCfBmubcjK8K06IUZ8I9VcYPa';
  let options = {
    json: true 
  };

  request(spaceUrl, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.send(err);
    }
  });   
});

// --------------------------------------------------------
// wrap an api request in our own endpoint
app.get('/getRocketData', function(req, res) {

  let num_launches = req.query.num || 1;
  console.log(num_launches);
  
  let rocketUrl = 'https://launchlibrary.net/1.3/launch/next/' + num_launches;
  let options = {
    json: true 
  };

  // make an api request to the ghibli api /films endpoint
  request(rocketUrl, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.send(err);
    }
  }); 
});

// --------------------------------------------------------
// tell our app where to listen for connections
app.listen(PORT, function() {
  console.log('listening on PORT: ' + PORT);
});