var express = require('express')
, bodyParser = require('body-parser');
var app = express()
var path = require('path')
var php_db = require('./modules/php-crud/php-db')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.join(__dirname + '/modules/php-crud/php-DB.db'),
(err) => {
  if (err) {
    console.error(err.message)
  }
  php_db.createDatabase(db)

  console.log('Connected to the php database.')
})

// Define the port to run on
app.set('port', 3000);
app.use(bodyParser.json());
// Static routes for public files
app.use('/images', express.static(path.join(__dirname + '/../public/images')));
app.use('/js', express.static(path.join(__dirname + '/../public/js')));
app.use('/css', express.static(path.join(__dirname + '/../public/css')));
app.use('/lib', express.static(path.join(__dirname + '/../../node_modules')));
app.use('/', express.static(path.join(__dirname, '../public/views')));
// app.use('/lib', express.static(path.join(__dirname + '../../node_modules')));

// Listen for requests on the above defined port
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Node webserver listenting on ' + port);
})

// >>>> demo code
app.get('/*.json', function (req, res) {
  console.log("pleb")
  res.json("[{pleb:'pleb'}]")
})
// <<<< demo code

app.post('/create', function (req, res) {
  console.log("create record request");
  console.log(req.body);
  var temp = JSON.parse(req.body);
  console.console.log(temp.name);
  console.log(req.body.name);

  php_db.addStockItem(db, 'Jordan', 10, 12);
  res.json();
})
app.post('/read', function (req, res) {
  console.log("read records request")
  php_db.getStockItems(db, (rows) => {
    res.json(rows);
  })
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
