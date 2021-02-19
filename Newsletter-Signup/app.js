const express = require("express");
const request = require("express");
const body_parser = require("body-parser");
const md5 = require("md5");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(body_parser.urlencoded({extended:true}));
app.listen(3000, function(){
    console.log("serve stared");
});

mailchimp.setConfig({
    apiKey: 'c40bdf3633f65f096dca5bb90638c52e-us1',
    server: 'us1',
});

const listId = "500aa7a93c"

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName + " " + lastName + " " + email);
    callPing();
    run(firstName, lastName, email, res);
});

async function run(firstName, lastName, email, res)
{
    var subscriberHash = md5(email.toLowerCase());
    var x = await checkSubscription(subscriberHash, res);
    console.log(x);
    if(x == 1)
    {
        console.log("Status is: " + x);
        res.send("Email Already in Use!!");
    }

    else{
        var subscribingUser = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        }
        addSubscription(subscribingUser, res);
    }
}

async function callPing() {
    const response = await mailchimp.ping.get();
    console.log(response);
}

async function checkSubscription(subscriberHash, res) {
    try {
      const response = await mailchimp.lists.getListMember(
        listId,
        subscriberHash
      );
  
    } catch (e) {
      if (e.status === 404) {
            return Promise.resolve(0);            
        }
      
    }
    return Promise.resolve(1);
  }

async function addSubscription(subscribingUser, res) {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    
    res.send("Subscribed Successfully! \n Response id is: " + response.id);
  }