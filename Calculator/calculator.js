const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.listen(3000, function()
{
    console.log("Server started");
});

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res)
{
    console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var a = Number(req.body.num1);
    var b = Number(req.body.num2);
    res.send("cal = " + (a+b));
})