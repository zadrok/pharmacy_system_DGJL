

module.exports.createDatabase = function(db) {
  db.serialize(()=>{
    try {
      //db.run('CREATE TABLE IF NOT EXISTS orders ( id integer NOT NULL CONSTRAINT order_pk PRIMARY KEY, order_no character(12) NOT NULL, sales_person_id integer NOT NULL, date datetime NOT NULL, CONSTRAINT client_order FOREIGN KEY (sales_person_id) REFERENCES sales_person (id))');
    //  db.run('CREATE TABLE IF NOT EXISTS order_item (id integer NOT NULL CONSTRAINT order_item_pk PRIMARY KEY, order_id integer NOT NULL, product_id integer NOT NULL, amount integer NOT NULL, CONSTRAINT order_order_item FOREIGN KEY (order_id) REFERENCES "order" (id), CONSTRAINT product_order_item FOREIGN KEY (product_id) REFERENCES product (id))');
      db.run('CREATE TABLE IF NOT EXISTS stock_items (\
        sku INTEGER PRIMARY KEY AUTOINCREMENT , \
        name NOT NULL, \
        price NOT NULL, \
        quantity NOT NULL)');
      db.run('CREATE TABLE IF NOT EXISTS sales_records (\
          id INTEGER PRIMARY KEY, \
          date NOT NULL, \
          sku NOT NULL, \
          name NOT NULL, \
          price NOT NULL, \
          quantity NOT NULL)');
      //db.run('CREATE TABLE IF NOT EXISTS sales_person (id integer NOT NULL CONSTRAINT sales_person_pk PRIMARY KEY, full_name varchar(255) NOT NULL, password varchar(20) NOT NULL)');
    } catch(e){
      console.log(e);
    }
  });
  db.serialize(() => {
      initStockItemsTable(db)
  });
}

// Reads the JSON file that contains all the stock item definitons
function initStockItemsTable(db) {
  let stockItems = require("./php-stock_items.json");
  //console.log(stockItems);
  let column_names = Object.keys(stockItems[0]);
  let valueSets = stockItems.map(function(item){
  	return Object.keys(item).map(function(key) {
  		return item[key];
  	})
  })
  let placeholders = `${valueSets.map(function(valueSet) {return `(${valueSet.map(function(value) { return '?' }).join(',')})`} ).join(',')}`;
  let sql = `INSERT INTO stock_items(${column_names}) VALUES ${placeholders}`;
  console.log(sql);
  let flattnedValues = [].concat.apply([], valueSets);
  db.run(sql, flattnedValues, (err) => {
    if (err) { return console.error(err.message); }
    console.log(`Rows inserted ${this.changes}`);
  })
}

// SKU/Stock methods
module.exports.getStockItems = function(db, callback) {
  db.serialize(() => {
    let sql = `SELECT * FROM stock_items`;
    db.all(sql, [], (err, rows) => {
      if (err) { return console.error(err.message); }
      //console.log(rows);
      callback(rows)
    });
  })
}
module.exports.addStockItem = function(db, name, price, qty) {
  db.serialize(() => {
    db.run('INSERT INTO stock_items (name, price, quantity) VALUES (?, ?, ?)', name, price, qty);
  })
}
module.exports.updateStockItem = function(db, sku, name, price, qty) {
  db.serialize(() => {
    db.run('UPDATE stock_items SET name = ?, price = ?, quantity = ? WHERE sku = ?', name, price, qty, sku);
  })
}
module.exports.deleteStockItem = function(db, sku) {
  db.serialize(() => {
    db.run('DELETE FROM stock_items WHERE sku=?', sku);
  })
}

// Sales methods
module.exports.getSalesRecords = function(db, dateFrom, dateTo, callback) {
  db.serialize(() => {
    let sql = "SELECT * FROM sales_records WHERE datetime(date) "
    + `BETWEEN datetime('${dateFrom}') AND datetime('${dateTo}')`
    + " ORDER BY datetime(date) DESC";
    console.log(sql)
    db.all(sql, [], (err, rows) => {
      if (err) { return console.error(err.message); }
      console.log(rows);
      callback(rows)
    })
  })
}
module.exports.recordSale = function(db, date, cart) {
  db.serialize(() => {
    let valueSets = cart.map(cartItem => [date, cartItem.sku, cartItem.name, cartItem.price, cartItem.quantity])
    let placeholders = `${valueSets.map(valueSet => `(${valueSet.map(value => '?').join(',')})`).join(',')}`;
    let sql = `INSERT INTO sales_records (date, sku, name, price, quantity) VALUES ${placeholders}`
    let flattnedValues = valueSets.reduce((prev, itemArr) => prev.concat(itemArr))
    db.run(sql, flattnedValues,(err) => {
      if (err) { return console.error(err.message); }
    })
    for(var i = 0, len = cart.length; i < len; i++) {
      db.serialize(() => {
        let sql = `UPDATE stock_items SET quantity = quantity - ? WHERE sku = ?`
        let values = [cart[i].quantity, cart[i].sku]
        db.run(sql,values,(err)=>{
          if (err) { return console.error(err.message); }
        });
        console.log(cart[i].name + " quantity changed by: -" + cart[i].quantity);
      })
    }
  })
}
// module.exports.updateSalesRecord = function(db, sku, name, price, qty) {
//   db.serialize(() => {
//     db.run('UPDATE stock_items SET name = ?, price = ?, quantity = ? WHERE sku = ?', name, price, qty, sku);
//   })
// }
// module.exports.deleteSalesRecord = function(db, sku) {
//   db.serialize(() => {
//     db.run('DELETE FROM stock_items WHERE sku=?', sku);
//   })
// }
