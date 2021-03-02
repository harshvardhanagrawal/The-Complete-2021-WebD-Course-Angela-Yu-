const express = require("express");
const app = express();

app.listen(3000, function(){
    console.log("Server Started");
});

app.get("/", function(req, res){
    res.send("/close to clode the browser \n");
});

app.get("/close", function(req, res){
    this.close();
});