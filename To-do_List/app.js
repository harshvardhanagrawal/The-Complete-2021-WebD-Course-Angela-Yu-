const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server started");
});

var today =  new Date();
var currentDay = today.getDay();
var kindOfDay = "";
var items = [" "];

if(currentDay==0 || currentDay == 6)
{
    kindOfDay = "Weekend";
}

else{
    kindOfDay = "Weeekday";
}

app.get("/",function(req, res){
    res.render('list', {kindOfDay:kindOfDay, items:items});
});

app.post("/", function(req, res){
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});