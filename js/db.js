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
            getUsers: function(callback) {
                var query = new Parse.Query('Account');
                query.descending('phoneNumber').find({
                    success: callback,
                    error: function(err) {
                        console.log('couldn\'t table scan Accounts');
                    }
                })
            },
            getAskers: function(location, callback) {
                var query = new Parse.Query('Query');
                query.equalTo("Place", location);
                query.equalTo("Time", new Date().getHours())
                query.descending('createdAt').find({
                    success: function(results) {
                        callback(results);
                    }
                })
            },
            addQuery: function(user, location, callback) {
                var Query = Parse.Object.extend("Query");
                var created = new Query();
                created.set("phoneNumber", user);
                created.set("Place", location);
                created.set("Time", new Date().getHours());
                created.save(null, {
                                success: function() {
                                    callback();
                                }
                            });  
            },
            isUser: function(user, callback) {
                var User = Parse.Object.extend("Account");
                var query = new Parse.Query(User);
                query.equalTo("phoneNumber", user);
                query.find({
                    success: function(results) {
                        if (results.length === 0) {
                            console.log('added a user');
                            var Account = Parse.Object.extend("Account");
                            var created = new Account();
                            created.set("phoneNumber", user);
                            created.set("confidence", 3);
                            created.save(null, {
                                success: function() {
                                    callback();
                                }
                            });                   
                        } else {
                            console.log('user already there');
                            callback();
                        }
                    },
                    error: function(error) {
                        console.log('ERROR IN isUSER');
                        console.log(error);
                    }
                });
            },
            removeUser: function(user, callback) {
                var User = Parse.Object.extend("Account");
                var query = new Parse.Query(User);
                query.equalTo("phoneNumber", user);
                query.find({
                    success: function(results) {
                        results[0].destroy({
                            success: function() {
                                console.log("User was removed from database");
                                callback();
                            },
                            error: function(error) {
                                console.log("User could not be removed from database");
                                callback();
                            }
                        });
                    },
                    error: function(error) {
                        console.log("User was not in database");
                        callback();
                    }
                });
            },
            updateConfidence: function(user, confidence, callback) {
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
                console.log('in getConfidence: ' + user);
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
                console.log('in recordResponse');
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
