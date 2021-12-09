var csv = require("fast-csv");
const uri = "mongodb+srv://skygoaleducation:skygoaleducation@priaynaka-saree-mandir.98lj8.mongodb.net/priaynaka_saree_mandir?retryWrites=true&w=majority";
var MongoClient = require('mongodb').MongoClient;

var dataArr = [];
csv.parseFile("cus.csv", {headers: true})
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
    var dbo = db.db("priaynaka_saree_mandir");
    
    dbo.collection("customer").insertMany(dataArr, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  }); 