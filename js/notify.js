/*
 *  to use, simply:
 *   var notify = require('notify');
 *   notify.send('+18577568635', 'Hello!');
 *
 */

var creds  = require('./credentials.js')
var client = require('twilio')(creds.AUTH, creds.TOKEN);

module.exports = {
    send: function(user, msg, callback) {
        if (!callback) {
            callback = function(error, message) {
                if (!error) {
                    console.log('message sent.')
                }
            }
        }
        client.sms.messages.create({
            to: user,
            from: '+18552651514',
            body: msg
        }, function(error, message) {
            if (error) {
                console.log('\033[92mERROR in send():\033[0m')
                console.log(error);
            }
            else if (callback) callback();
        }); 
    }
}

