var YES = [ "yes", "y", "1", "ya", "yer", "yee", "yeah dawg", "yeah"];
var NO = ["no", "n", "0", "ner", "nope", "nah" ];

var db = require('./db.js')();

module.exports = function() {

    // initialize any db shit here
    var cloud = require("parse-cloud-express");
    var Parse = cloud.Parse;

    Parse.initialize("EADFqiDJ5SS1qXkcJM6FILbpT9d14sO5gO3FwksD",
                 "bdY6CgnZI7bNTxFWoepER874qK81WYLYUT62xSVp");
    
    return {
        confidence: {
			record: function(user, response, callback) {
				db.database.getConfidence(user, function(conf) {
					if (YES.indexOf(response.toLowerCase()) > -1 || NO.indexOf(response.toLowerCase()) > -1) {			
						db.database.updateConfidence(user, conf + 1);
						callback(true);
					} else { 
						db.database.updateConfidence(user, conf - 1);
						callback(false);
					}
				})			
			},

			yesOrNo: function(response) {
				if (YES.indexOf(response.toLowerCase()) > -1) {
					return true;
				} else if (NO.indexOf(response.toLowerCase()) > -1) {
					return false;
				}

				return false;
			}
		}
	}
}