/*
 *  to use, simply:
 *   var notify = require('notify');
 *   notify.send('+18577568635', 'Hello!');
 *
 */

module.exports = function() {
    return {

        // user should be a phone number (as a string)
        send: function(user, msg) {
            // text them message to the user
        }
    }
}

