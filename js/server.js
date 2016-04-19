var express     = require('express');
var twilio      = require('twilio');

var switchboard = require('./switchboard.js');
var notify      = require('./notify.js');
var creds       = require('./credentials.js')

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    res.send('Under Construction');
});


// route to respond to a text message
app.get('/response_hook', function(req, res) {
    var from = res.req.query.From;
    var body = res.req.query.Body;

    // send response to user
    var response = 'You said, "' + body + '"'; // switchboard.direct(from, body);
    if (response) {
        notify.send(from, response);
    }

    // send an empty response to twilio
    res.type('text/xml');
    res.send((new twilio.TwimlResponse()).toString());
});

app.listen(app.get('port'), function() {
    console.log('Example app listening on port ' + app.get('port'));
});

