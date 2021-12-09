var csv = require("fast-csv");
const uri = "<YOUR_DATABASE_URL_HERE>";
var MongoClient = require('mongodb').MongoClient;

var dataArr = [];
csv.parseFile("<CSV_FILE_PATH_HERE>", {headers: true})
.on("data", data => {
  dataArr.push(data);
})
.on("end", () => {
  console.log(dataArr);
  // > 4187
});

console.log('hello')

MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("<YOUR_DB_NAME>");
    
    dbo.collection("<YOUR_COLLECTION_NAME>").insertMany(dataArr, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  }); 
