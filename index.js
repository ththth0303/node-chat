var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var port1 = Number(process.env.PORT || 5000);
var server = app.listen(port1, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})