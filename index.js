var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname,"app/dist")));
app.get('/1', function (req, res) {
  res.render('app/dist/index.html');
});


var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6960);
app.listen(port, function(){
    console.log("Started listening on port", port);
})   