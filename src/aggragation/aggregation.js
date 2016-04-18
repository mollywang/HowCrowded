// returns current decision and confidence score for the given responses (res)

function score(res) {
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
		return true, float(avg * 100);
	}
	else {
		return false, float((1 - avg) * 100);
	}
}