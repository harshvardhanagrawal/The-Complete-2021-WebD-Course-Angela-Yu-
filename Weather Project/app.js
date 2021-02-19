const express = require("express");
const app = express();
const  https = require("https");
const bodyParser = require("body-parser")
app.listen(3000, function()
{
    console.log("Server started");
});
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
    var city = (req.body.city);
    var temperature;
    console.log(city);
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a5c3759c7dfc86305ee345d38e27e8a3";
    https.get(url, function(response){
        response.on("data", function(data)
        {
            const wdata = JSON.parse(data);
            // console.log(wdata);
            if(wdata.cod == 200)
            {
                temperature = wdata.main.temp;
            // console.log(temperature);
                res.send("Temperature in " + city + " is " + temperature);
            }

            else{
                res.send("City not found");
            }
        });
    });
    // res.send("Temperature in " + city + " is " + temperature);
});

function callApi(url, res, city)
{
    
}
