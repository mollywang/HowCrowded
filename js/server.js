var express     = require('express');
var twilio      = require('twilio');
var switchboard = require('./switchboard.js')

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});


// route to respond to a text message
app.post('/respond', function(req, res) {

    // validate that this request really came from Twilio
    if (twilio.validateExpressRequest(req, 'AUTH_TOKEN')) {
        var twiml = new twilio.TwimlResponse();

        // ask for a response message
        var response = switchboard.direct(res['number'], res['message']);

        // do something with message 
        if (response != null) {
            res.type('text/xml');
            res.send(twiml.toString());
        } else {
            res.send('Nothing to do.');
        }
    }
    else {
        res.send('This is not from Twilio.');
    }
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

