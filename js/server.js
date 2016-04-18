var express     = require('express');
var twilio      = require('twilio');

var switchboard = require('./switchboard.js');
var notify      = require('./notify.js');
var creds       = require('./credentials.js')

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
    //notify.send('+18577568635', 'Hey, b.', function(err, msg) {
        //console.log(err);
        //console.log(msg);
        //res.send('Texting now.');
    //});
    res.send('Under Construction');
});


// route to respond to a text message
app.post('/response_hook', function(req, res) {
    // validate that this request really came from Twilio
    if (twilio.validateExpressRequest(req, creds.AUTH)) {

        // ask for a response message
        var response = switchboard.direct(res['From'], res['Body']);

        console.log('RECIEVED RESPONSE');
        console.log(res);
        console.log();
        
        if (response != null) {
            notify.send(res['From'], response);
        }

        // send HTTP 200 Success response to Twilio
        res.send(200);

    }
    else {
        res.send(401);
    }
});

app.listen(app.get('port'), function() {
    console.log('Example app listening on port ' + app.get('port'));
});

