var ACCEPTABLE = [ "yes", "no", "y", "n", "1", "0",
                   "ya", "yer", "ner", "yee", "yea dawg", 
                   "yea", "nope", "nah" ]

var record = function(response) {
	var pid = response;
	var answer = response;

	if (answer.toLowerCase() in ACCEPTABLE) {
		var confidence = db.user.getConfidence(); //db/users must be called before
		db.user.updateConfidence(confidence - 1);
	} 
	return confidence; //do we want this?
}
