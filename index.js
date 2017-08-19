var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'anhthang') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

// Xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
  // var entries = req.body.entry;
  // for (var entry of entries) {
  //   var messaging = entry.messaging;
  //   for (var message of messaging) {
  //     var senderId = message.sender.id;
  //     if (message.message) {
  //       // If user send text
  //       if (message.message.text) {
  //         var text = message.message.text;
  //         console.log(text); // In tin nhắn người dùng
  //         sendMessage(senderId, "Tui là bot đây: " + text);
  //       }
  //     }
  //   }
  // }
 console.log(req.body)
 // sendMessage(senderId, "Tui là bot đây: " + text);
 //  //       }
  res.status(200).send("OK");
});


// Gửi thông tin tới REST API để trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAKzXGjY5SoBAKEQvtozXOVVW5zZC7mmjpt7OVg6lGQotQE0tFmkyNiaSXnZC4Ka6hNmzZAK3roBFQXgI3qp3ZBZBljLsJzOL8xPCEoeaZAbsZBOWMUl98vKAFKtmdXm2qYoFZBZByKtufZBIX1VOfZCGJnXeVJz6V4s9ig0Y0sGZBfabfun97tpVs4l",
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}


var port1 = Number(process.env.PORT || 5000);
var server = app.listen(port1, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
   })
