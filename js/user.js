var ACCEPTABLE = [ "yes", "no", "y", "n", "1", "0",
                   "ya", "yer", "ner", "yee", "yea dawg", 
                   "yea", "nope" ]

var record = function(response) {
	var pid = response;
	var answer = response;

	if (answer.toLowerCase() in ACCEPTABLE) {
		var confidence = db.user.get_confidence(); //db/users must be called before
		db.user.update_confidence(confidence - 1);
	} 
	return confidence; //do we want this?
}
