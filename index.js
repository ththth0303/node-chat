// # SimpleServer
// A simple chat bot server
var bodyParser = require('body-parser');
var express = require('express');
var router = express();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var request = require("request");

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
})




// Đây là đoạn code để tạo Webhook
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'anhthang') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

// Xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // If user send text
        if (message.message.text) {
            switch(message.message.text) {
                case 'tuấn':
                    var text = 'Tuấn củ lìn'
                    break;
                case 'mỹ':
                    var text = 'Mỹ đê tiện'
                    break;
                case 'tài':
                    var text = 'Tài nhớt'
                    break;
                case 'thắng':
                    var text = 'Thắng đại ca'
                    break;
                case 'xin link':
                    var text = 'http://www.petalia.org/Funpage/girlxinh.htm\
                                https://drive.google.com/drive/folders/0Bz1ccpxclii5YWlzOTRLc21BTzA\
                                https://drive.google.com/drive/folders/\
                                https://www.flickr.com/photos/130552237@N04/'
                    break;
                default:
                     var text = 'Nhập tên mày vào'
            }
          console.log(text); // In tin nhắn người dùng
          sendMessage(senderId, text);
        }
      }
    }
  }

  res.status(200).send("OK");
});


// Gửi thông tin tới REST API để trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAKzXGjY5SoBAEd79lHykOP4art76QOTgU5xPkFu8eZAxUkUOTtnWPsJoKYTGcnY3FI8xDgghiZAoQyoFjnu7mBVAYQE3mjmKqPLEny3gmBIbdFeRjVMHmFH7y7TriwCtakUbilaKjZAofRjYFe9LjphPh5XqDKvlEAt7In0PEs95D6YZBoy",
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

// app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6000);
// app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

// server.listen(app.get('port'), app.get('ip'), function() {
//   console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
// });

var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6000);

app.listen(port, function () {
  console.log('Example app listening on port:' + port)
})