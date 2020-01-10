const express = require("express");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));

MongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  function(err, database) {
    if (err) {
      console.log(err);
    }
    app.listen(3012, function() {
      console.log("API app started");
    });
  }
);

app.get("/", function(req, res) {
  res.sendFile(
    path.resolve(__dirname, "client", "build", "index.html")
  );
});
