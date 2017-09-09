var express = require('express')
var app = express()
var path = require('path')
var data = require('./modules/php-crud/db-setup')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

// Define the port to run on
app.set('port', 3000);
console.log(path.join(__dirname + '/../public/css'));

app.use('/images', express.static(path.join(__dirname + '/../public/images')));
app.use('/js', express.static(path.join(__dirname + '/../public/js')));
app.use('/css', express.static(path.join(__dirname + '/../public/css')));
app.use('/lib', express.static(path.join(__dirname + '/../../node_modules')));
app.use('/', express.static(path.join(__dirname, '../public/views')));

// app.use('/lib', express.static(path.join(__dirname + '../../node_modules')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
  data.createdatabase(db);
  console.log('Database Created');
});

// >>>> demo code
app.get('/*.json', function (req, res) {
  console.log("pleb")
  res.json("[{pleb:'pleb'}]")
})
// <<<< demo code

app.post('/create', function (req, res) {
  console.log("create record request")
  // <do create record>()
  // get <result> from <do create record>()
  // respond with res.json(<result>)
})
app.post('/read', function (req, res) {
  console.log("read records request")
  // <do read records>()
  // get <result> from <do read records>()
  // respond with res.json(<result>)
})
app.post('/update', function (req, res) {
  console.log("update records request")
  // <do update records>()
  // get <result> from <do update records>()
  // respond with res.json(<result>)
})
app.post('/delete', function (req, res) {
  console.log("delete records request")
  // <do delete records>()
  // get <result> from <do delete records>()
  // respond with res.json(<result>)
})
