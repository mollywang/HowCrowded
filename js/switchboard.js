var aggregation = require('./aggregation.js')();
var user        = require('./user.js')();
var db          = require('./db.js')();

var QUESTION  = [ "is", "?", "how" ];
var LOCATIONS = [ 'blarneys', 'huntsman' ];

/*
 *  this will be called by our web app when it 
 *  recieves a response
 */

var error = function(callback) {
    console.log('error function');
    var res1 = 
        'We don\'t understand you. Try:\n' +
        '"[LOCATION] [YES/NO]" to report if a place is crowded\n' +
        'or \n' +
        '"[LOCATION]?" to ask if a place is crowded right now\n' 
    var res2 = '(Currently Supported Locations: Blarneys, Huntsman)'
    callback(res1);
    callback(res2);
}

var checkResponse = function(user, res, callback) {

    console.log('checking response')

    // answer
    var split = res.split(' ');
    if (split.length == 2) {
        console.log('its a report');
        var location = split[0];
        var answer   = split[1];
        if (LOCATIONS.indexOf(location) === -1) {
            error(callback);
            return;
        }

        db.database.recordResponse(user, answer, new Date().getHours(), location,
            function(valid) {
                console.log('report recorded');
                if (valid) {
                    callback('Thank you for your contribution!');
                } else {
                    callback('Thats an invalid answer');
                }
            }
      );
    } 
    
    // question 
    else if (split.length == 1) {
        console.log('its a question');
        var location = res.replace('?', '').replace('\'', '');

        if (LOCATIONS.indexOf(location) === -1) {
            error(callback);
            return;
        }

        aggregation.score.getScore(location, new Date().getHours(), function(ans) {
            console.log('retrieved the score');
            if (ans.crowded) {
                var msg = location + ' is crowded'
                if (ans.value === NaN) {
                    msg = msg + ' but we have no current reports to back that up.'
                } else {
                    msg = msg + ' (and ' + ans.value + '% of people have said so)'
                }
                callback(msg);
            } else {
                var msg = location + ' is not crowded'
                if (ans.value === NaN) {
                    msg = msg + ' but we have no current reports to back that up.'
                } else {
                    msg = msg + ' (and ' + ans.value + '% of people have said so)'
                }
                callback(msg);
            }
        });
    }
}

module.exports = {
    direct: function(user, response, callback) {
        var res = response.toLowerCase();

        console.log('adding user');
        db.database.isUser(user, function() {
            checkResponse(user, res, callback)
        });
    }
}
