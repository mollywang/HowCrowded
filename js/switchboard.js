var aggregation = require('./aggregation.js')();
var user        = require('./user.js')();
var db          = require('./db.js')();
var notify      = require('./notify.js');

var QUESTION  = [ "is", "?", "how" ];
var LOCATIONS = [ 'blarn', 'hunts', 'smoke', 'copa', 'harve', 'commo', 'starb', 'saxby', 'rodin', 'harri', 'harnw' ];
var NAMES     = [ 'Blarney\'s', 'Huntsman', 'Smoke\'s', 'Copabanana', 'Harvest', 'Commons', 'Starbucks', 'Saxby\'s', 'Rodin', 'Harrison', 'Harnwell' ];

/*
 *  this will be called by our web app when it 
 *  recieves a response
 */

var error = function(callback) {
    console.log('error function');
    var res1 = 
        'We don\'t understand you. Try:\n' +
        '"[LOCATION] is(n\'t) crowded" to report if a place is crowded\n' +
        'or \n' +
        '"Is [LOCATION] crowded?" to ask if a place is crowded right now\n' 
    var res2 = '(Try a bar or study space on the west end of campus)'
    callback(res1);
    callback(res2);
}

var extractLocation = function(message) {
    var tokens = message.split(' ');
    for (var i = 0; i < tokens.length; i++) {
        var word = tokens[i].substring(0, 5).toLowerCase();
        console.log(word);
        for (var j = 0; j < LOCATIONS.length; j++) {
            if (word.startsWith(LOCATIONS[j])) return LOCATIONS[j];
        }
    }
    return null;
}

var isQuestion = function(message) {
    message = message.toLowerCase();
    return message.startsWith('is') 
        || message.startsWith('how')
        || message.endsWith('?');
}

var isAnswer = function(message) {
    if (isQuestion(message)) 
        return undefined;
    else if (message.indexOf("isn't") != -1 || message.indexOf('is not') != -1) 
        return 'no';
    else if (message.indexOf('is') != -1)
        return 'yes';
    else
        return undefined;
}

var trueName = function(abbrev) {
    return NAMES[LOCATIONS.indexOf(abbrev)];
}

var checkResponse = function(user, res, callback) {

    console.log('checking response')
    
    var location = extractLocation(res);
    if (location == null) {
        console.log('no location found in message');
        error(callback);
        return;
    }


    // question 
    if (isQuestion(res)) {
        console.log('its a question');

        // send back the score
        aggregation.score.getScore(location, new Date().getHours(), function(ans) {
            console.log('retrieved the score');
            if (ans.crowded) {
                var msg = trueName(location) + ' is crowded'
                if (ans.value === NaN) {
                    msg = msg + ' but we have no current reports to back that up.'
                } else {
                    msg = msg + ' (and ' + ans.value + '% of people have said so)'
                }
                callback(msg);
            } else {
                var msg = trueName(location) + ' is not crowded'
                if (ans.value === NaN) {
                    msg = msg + ' but we have no current reports to back that up.'
                } else {
                    msg = msg + ' (and ' + ans.value + '% of people have said so)'
                }
                callback(msg);
            }
        });

        db.database.addQuestion(user, location, function() {});

        var msg = 'Hello! If you are at ' + trueName(location) + 
            ', please respond ' + 'with "' + trueName(location) + 
            ' is crowded" or ' + '"' + trueName(location) + ' is not crowded"!';

        db.database.getUsers(function(users) {
            console.log('texting everyone')
            for (var i = 0; i < users.length; i++) {
                if (users[i].get('phoneNumber') === user) {
                    console.log('not texting ' + user);
                    continue;
                }
                console.log('sending all to ' + users[i].get('phoneNumber'));
                notify.send(users[i].get('phoneNumber'), msg, null);
            }
        });
    }

    // answer
    var answer = isAnswer(res);
    if (answer != undefined) {
        console.log('its an answer');

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

        db.database.getAskers(location, function(askers) {
            console.log('getting the askers for ' + location + ' (' + askers.length + ')');
            var msg = 'Someone just reported that ' + trueName(location) 
                + ' is currently';
            if (answer == 'yes') msg += ' isn\'t';
            msg += ' crowded! We thought you would like to know, because you\'ve';
            msg += ' asked recently.';
            for (var i = 0; i < askers.length; i++) {
                console.log('asking ' + askers[i]);
                notify.send(askers[i].get('phoneNumber'), msg, null);
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
