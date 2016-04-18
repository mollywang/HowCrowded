// returns current decision and confidence score for the given responses (res)

var score = function(res) {
	if (res.length == 0) {
		return true, 0;
	}
	var total = 0; 

	// finding average from array of responses
	for (var i = 0; i < res.length; i++) {
		total += res[i];
	}

	var avg = total / res.length;
	if (avg > 0.5) {
		return true, (avg * 100);
	}
	else {
		return false, ((1 - avg) * 100);
	}
}
