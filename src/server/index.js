var express = require('express')
var app = express()
var path = require('path')

// Define the port to run on
app.set('port', 3000);
console.log(path.join(__dirname + '/../public/css'));

app.use('/js', express.static(path.join(__dirname + '/../public/images')));
app.use('/js', express.static(path.join(__dirname + '/../public/js')));
app.use('/css', express.static(path.join(__dirname + '/../public/css')));
app.use('/lib', express.static(path.join(__dirname + '/../../node_modules')));
app.use('/', express.static(path.join(__dirname, '../public/views')));

// app.use('/lib', express.static(path.join(__dirname + '../../node_modules')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
