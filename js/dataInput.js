var cloud = require("parse-cloud-express");
var Parse = cloud.Parse;

Parse.initialize("EADFqiDJ5SS1qXkcJM6FILbpT9d14sO5gO3FwksD",
				 "bdY6CgnZI7bNTxFWoepER874qK81WYLYUT62xSVp");

var Response = Parse.Object.extend("Response");
var test = new Response();

test.set("Answer", true);
test.set("Place", "Blarney");
test.set("Time", 23);


test.save(null, {
	success: function(gameScore) {
		console.log("Saved");
	}
});