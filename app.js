const express = require("express");
const bodyparser = require("body-parser");

const app = express();
var items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', function(req, res){
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
    res.render("list", {ListTitle: day, newListItem: items});
});
app.post("/", function(req, res){
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});
app.get("/work", function(req, res){
  res.render("list", {ListTitle: "Work List", newListItem: workItems});
});
app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});
app.listen(3000, function(){
  console.log("Server started on your port 3000");
});
