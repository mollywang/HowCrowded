var cloud = require("parse-cloud-express");
var Parse = cloud.Parse;

Parse.initialize("EADFqiDJ5SS1qXkcJM6FILbpT9d14sO5gO3FwksD",
				 "bdY6CgnZI7bNTxFWoepER874qK81WYLYUT62xSVp");

/*var Response = Parse.Object.extend("Response");
var test = new Response();

test.set("Answer", true);
test.set("Place", "Blarney");
test.set("Time", 23);*/

var Account = Parse.Object.extend("Account");
var test = new Account();

test.set("phoneNumber", "12345");
test.set("confidence", 40);

test.save(null, {
		success: function(gameScore) {
			console.log("Saved");
		}
	});

//set all busy times @ blarneys
/*for (i = 1; i < 3; i++) { 
    var blarney = new Response();
    blarney.set("Answer", true);
	blarney.set("Place", "Blarneys");
	blarney.set("Time", i);


	blarney.save(null, {
		success: function(gameScore) {
			console.log("Saved");
		}
	});
}

for (i = 22; i < 25; i++) { 
    var blarney = new Response();
    blarney.set("Answer", true);
	blarney.set("Place", "Blarneys");
	blarney.set("Time", i);


	blarney.save(null, {
		success: function(gameScore) {
			console.log("Saved");
		}
	});
}
 
//set all non-busy times @blarneys
for (i = 3; i < 22; i++) { 
    var blarney = new Response();
    blarney.set("Answer", false);
	blarney.set("Place", "Blarneys");
	blarney.set("Time", i);


	blarney.save(null, {
		success: function(gameScore) {
			console.log("Saved");
		}
	});
}

//set all busy times @ huntsman
//set all non-busy times @ huntsman
for (i = 9; i < 25; i++) { 
    var huntsman = new Response();
   	huntsman.set("Answer", true);
	huntsman.set("Place", "Huntsman");
	huntsman.set("Time", i);
	huntsman.save(null, {
		success: function(gameScore) {
			console.log("Saved");
		}
	});
}
for (i = 1; i < 3; i++) { 
    var huntsman = new Response();
   	huntsman.set("Answer", true);
	huntsman.set("Place", "Huntsman");
	huntsman.set("Time", i);
	huntsman.save(null, {
		success: function(gameScore) {
			console.log("Saved");
		}
	});
}

//set all non-busy times @ huntsman
for (i = 3; i < 9; i++) { 
    var huntsman = new Response();
   	huntsman.set("Answer", false);
	huntsman.set("Place", "Huntsman");
	huntsman.set("Time", i);
	huntsman.save(null, {
		success: function(gameScore) {
			console.log("Saved");
		}
	});
}*/


