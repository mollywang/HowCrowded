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
    var cloud = require("parse-cloud-express");
    var Parse = cloud.Parse;

    Parse.initialize("EADFqiDJ5SS1qXkcJM6FILbpT9d14sO5gO3FwksD",
                 "bdY6CgnZI7bNTxFWoepER874qK81WYLYUT62xSVp");
    
    return {
        user: {
            updateConfidence: function(user, confidence) {
                var User = Parse.Object.extend("Account");
                var query = new Parse.Query(User);
                query.equalTo("phoneNumber", user);
                query.find({
                    success: function(results) {
                        console.log("Old confidence: " + results[0].get("confidence"));
                        results[0].set("confidence", confidence);
                        results[0].save();
                        console.log("New confidence: " + results[0].get("confidence"));
                    },
                    error: function(error) {
                        console.log("Query for user failed - phone number is not in database");
                    }
                });
            },
            getConfidence: function(user) {
                // get user confidence
                var User = Parse.Object.extend("Account");
                var query = new Parse.Query(User);
                query.equalTo("phoneNumber", user);
                query.find({
                    success: function(results) {
                        console.log(results[0].get("confidence"));
                        return results[0].get("confidence");
                    },
                    error: function(error) {
                        console.log("Query for user failed - phone number is not in database");
                    }
                });
            },
            recordResponse: function(user, response, time) {
                // record in response
            }
        },
    }

}
