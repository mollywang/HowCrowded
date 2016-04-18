var aggregation = require('./aggregation.js')
var user        = require('./user.js')

/*
 *  this will be called by our web app when it 
 *  recieves a response
 */

var direct = function(user, response) {
    // check response,
    //   if a question, ask aggregation what the answer is 
    //   if an answer, record the answer through user
    //   otherwise, produce an error
    // should @return a response to the text, or null if none is required
    // could also provide more functionality (such as help, options, etc)
}
