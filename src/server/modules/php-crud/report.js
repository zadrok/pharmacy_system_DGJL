//Returns 2 arrays, x - date, y - stock total at time.

module.exports.getSStockTrendByDate = function(db,sku, dateFrom, dateTo) {
  db.serialize(() => {
    let sql = `SELECT quantity, date FROM sales_records \
    WHERE datetime(date) BETWEEN datetime(${dateFrom}) AND datetime(${dateTo}) \
    AND sku ORDER BY datetime(date) DESC`;
    var i = 0;
    var date = [];
    var qty = [];
    db.each(sql, [], (err, row) => {
      if (err) { return console.error(err.message); }
      date[i] = row.date;
      qty[i] = row.quantity;
      console.log(date[i]);
      console.log(qty[i});
      i++;
  })
}
