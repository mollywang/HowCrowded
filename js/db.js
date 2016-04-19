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
        database: {
            updateConfidence: function(user, confidence) {
                var User = Parse.Object.extend("Account");
                var query = new Parse.Query(User);
                query.equalTo("phoneNumber", user);
                query.find({
                    success: function(results) {
                        results[0].set("confidence", confidence);
                        results[0].save();
                    },
                    error: function(error) {
                        console.log("Query for user failed - phone number is not in database");
                    }
                });
            },
            getConfidence: function(user, callback) {
                // get user confidence
                var User = Parse.Object.extend("Account");
                var query = new Parse.Query(User);
                query.equalTo("phoneNumber", user);
                query.find({
                    success: function(results) {
                        console.log("Confidence: " + results[0].get("confidence"));
                        callback(results[0].get("confidence"));
                    },
                    error: function(error) {
                        console.log("Query for user failed - phone number is not in database");
                    }
                });
            },
            recordResponse: function(user, response, time, place, callback) {
                var userMod = require('./user.js')();
                userMod.confidence.record(user, response, function(valid) {
                    console.log(valid);
                    if (valid) {
                        Response = Parse.Object.extend("Response");
                        var resp = new Response();

                        resp.set("Answer", userMod.confidence.yesOrNo(response));
                        resp.set("Time", time);
                        resp.set("Place", place);
                        resp.save();
                    }
                    callback(valid);
                });
                
            }
        },
    }

}
