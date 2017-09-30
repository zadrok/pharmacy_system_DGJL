var express = require('express')
, bodyParser = require('body-parser');
var app = express()
var path = require('path')
var php_db = require('./modules/php-crud/php-db')
var report = require('./modules/php-crud/report.js')
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


app.post('/create-sku', function (req, res) {
  console.log("create record request");
  console.log("create stock item: " + req.body);
  php_db.addStockItem(db, req.body.name, req.body.price, req.body.quantity);
  php_db.getStockItems(db, (rows) => {
    res.json(rows);
  })
})
app.post('/read-skus', function (req, res) {
  console.log("read records request")
  php_db.getStockItems(db, (rows) => {
    res.json(rows);
  })
})
app.post('/update-sku', function (req, res) {
  console.log("update records request")
  php_db.updateStockItem(db, req.body.sku, req.body.name, req.body.price, req.body.quantity);
  php_db.getStockItems(db, (rows) => {
    res.json(rows);
  })
})
app.post('/delete-sku', function (req, res) {
  console.log("delete records request")
  php_db.deleteStockItem(db, req.body.sku);
  php_db.getStockItems(db, (rows) => {
    res.json(rows);
  })
})

app.post('/create-sale', function (req, res) {
  console.log("create sale request")
  php_db.recordSale(db, req.body.date, req.body.cart);
  php_db.getStockItems(db, (rows) => {
    res.json(rows);
  })
})
