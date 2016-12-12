var express = require('express');
var router = express.Router();
var axios = require('axios');
var fs=require('fs');

var authToken;

router.post('/getAuth', function(req, res){
  var email=req.body.email;
  var password=req.body.password;

  var authOptions = {
      method: 'POST',
      url: 'https://api.datonis.io/api_sign_in',
      data: {
        'email': email,
        'password': password
      },
      headers: {
        'Content-Type' : 'application/json'
      },
      json: true
  };

  axios(authOptions).then(function(response){
    authToken = response.data.auth_token;
    res.send(response.data.auth_token);
  }, function(err){
    console.log(req.body, email, password);
    res.send(err);
  })
});

router.get('/getThings', function(req, res){

  var authOptions = {
      method: 'GET',
      url: 'https://api.datonis.io/api/v3/things',
      headers: {
        'Content-Type' : 'application/json',
        'X-Auth-Token': authToken
      },
      json: true
  };

  axios(authOptions).then(function(response){
    res.send(response.data);
  }, function(err){
    console.log(err);
    res.send(err);
  })
})

router.get('/getMetrics', function(req, res){

  var authOptions = {
      method: 'GET',
      url: 'https://api.datonis.io/api/v3/metrics',
      data: {
        'thing_template_key':'e53898a17c',
        'per': 40
      },
      headers: {
        'Content-Type' : 'application/json',
        'X-Auth-Token': authToken
      },
      json: true
  };

  axios(authOptions).then(function(response){

    res.send(response.data);
  }, function(err){
    console.log(err.response.data);
    res.send(err.response.data);
  })
});
router.get('/getMetricValues',function(req,res){
  fs.readFile('metrics.json', 'utf8', function(err, data){
   //console.log(data);
   res.send(data);
  });
});
router.post('/postChanges', function(req, res){
  var fields=req.body.fields;
  fs.writeFile('metrics.json', JSON.stringify(fields), 'utf8', function(err) {
    if(err) throw err;
    console.log("Saved metrics successfully!");
  })
  res.send("Saved metrics successfully!");
});


module.exports = router;
