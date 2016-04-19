var aggregation = require('./aggregation.js');
var user        = require('./user.js');
var QUESTION = ["is", "?", "how"];
var ANSWER = ["yes", "y", "1", "ya", "yer", "yee", "yeah dawg", "yeah", "no", "n", "0", "ner", "nope", "nah"];
/*
 *  this will be called by our web app when it 
 *  recieves a response
 */

var direct = function(user, response) {
    // check response
    //   if a question, ask aggregation what the answer is 
    if (QUESTION.indexOf(response.toLowerCase()) > -1) {

    }
    //   if an answer, record the answer through user
    else if (ANSWER.indexOf(response.toLowerCase()) > -1) {

    }
    //   otherwise, produce an error
    else {
    	throw new Error("Invalid Response");
    }
    // should @return a response to the text, or null if none is required
    // could also provide more functionality (such as help, options, etc)
    return 'you said "' + response + '"';
}
