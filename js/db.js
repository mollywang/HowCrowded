/*
 *  Usage
 *
 *  to init:
 *    var db = require('./db.js')();
 *    OR
 *    var Database = require('./db.js');
 *    var db = Database();
 *  to deal with user confidence:
 *    var confidence = db.user.getConfidence('+18567568635')
 *    db.user.updateConfidence('+18567568635', 1.07)
 *  to record a response from a user:
 *    db.user.recordResponse('+18567568635', 1, ?TIME?);
 */

module.exports = function() {

    // initialize any db shit here
    
    return {
        user: {
            updateConfidence: function(user, confidence) {
                // put user to confidence 
            },
            getConfidence: function(user) {
                // get user confidence
            },
            recordResponse: function(user, response, time) {
                // record in response
            }
        },
    }

}
