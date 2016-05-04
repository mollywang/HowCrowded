/*
 *  to use, simply:
 *   var notify = require('notify');
 *   notify.send('+18577568635', 'Hello!');
 *
 */
var db = require('./db.js')();

var creds  = require('./credentials.js')
var client = require('twilio')(creds.AUTH, creds.TOKEN);

var sendf = function(user, msg, callback) {
    console.log('texting: ' + msg);
    console.log('to ' + user);
    client.sms.messages.create({
        to: user,
        from: '+18552651514',
        body: msg
    }, function(error, message) {
        if (error) {
            console.log('\033[92merror in send():\033[0m')
            console.log(error);
        }
        else if (callback) callback();
    }); 
}

module.exports = {
    send: sendf,
    sendall: function(msg) {
        console.log('in sendall');
        db.database.getUsers(function(users) {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                console.log('sending all to ' + user.get('phoneNumber'));
                sendf(user.get('phoneNumber'), msg, null);
            }
        });
    }
}


