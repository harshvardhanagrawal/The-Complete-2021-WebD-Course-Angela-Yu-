const express = require("express");
var fs = require("fs");
const app = express();

app.get("/", function(request, response)
{
    response.send("<h1>Hellos</h1>");    
});

app.listen("3000", function(){
    console.log("Server started at 3000");
});