// returns current decision and confidence score for the given responses (res)

var db = require('./db.js')();

module.exports = function() {

    // initialize any db shit here
    var cloud = require("parse-cloud-express");
    var Parse = cloud.Parse;

    Parse.initialize("EADFqiDJ5SS1qXkcJM6FILbpT9d14sO5gO3FwksD",
                 "bdY6CgnZI7bNTxFWoepER874qK81WYLYUT62xSVp");
    
    return {
        score: {
        	getScore: function(place, time, callback) {
        		var query = new Parse.Query("Response");
        		query.descending("createdAt").find({
        			success: function(results) {
        				var yes = 0;
        				var no = 0;
        				for (var i = 0; i < results.length; i++) {
        					if (results[i].get("Place").toLowerCase() === place && results[i].get("Time") == time) {
        						if (results[i].get("Answer")) yes++;
        						else                          no++;
        					}
        				}

        				var avg =  yes / (yes + no);
                        console.log('in getScore');
                        console.log('\tavg: ' + avg);
                        console.log('\tyes: ' + yes);
                        console.log('\tno:  ' + no);
						if (avg > 0.5) {
							callback({
								crowded: true, 
								value: (avg * 100)
							});
						}
						else {
							callback({
								crowded: false, 
								value: (1 - avg) * 100
							});
						}

        			},
        			error: function(error) {
        				console.log("Failed to aggregate data");
        			}
        		})
        	}

        }
    }
}

