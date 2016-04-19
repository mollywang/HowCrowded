# Crowdr

![Crowdr](HowCrowded.png)

Crowdr is a web app for people who want to know crowded places are before they
have to make the effort to travel there. This is applicable for everyone from 
restaurant and bar-goers to neurotic students looking for a carrel in Huntsman 
or empty desk in Van Pelt.

## Project Component:

### Server Backend

The primary component of the project will be the backend server application,
which will consist of a communications module, a space module, an aggregation module, and a user/quality control module.

The communications module handles all communications to users. Notify.js uses the Twilio API to communicate with users via text message. For our prototype, users can text a place (for now, "Blarneys?" or "Huntsman?"), and they can receive a yes or no response of whether that space is crowded and a confidence score for that answer from 0 - 100. For users to contribute whether a space is full or not, they can text the place ("Blarneys" or "Huntsman) along with "yes" or "no", "yes" corresponding with the answer that the space is crowded, and "no" corresponding with the answer that the space is not crowded. Server.js is also used for communication. 

switchboard.js analyzes the text messages received to check whether it's a question or answer and handles the responses to the user. It communicates this response to user.js and aggregation.js, and is the link between the text messages from the user and recording user and response information on Parse. 

The aggregation module, aggregation.js, currently takes in place and time from switchboard.js, and accesses the Parse database for averaging stored responses. Aggregation.js returns an answer of true or false (to check for whether a place is crowded) and a confidence score for that particular place and time. 

db.js is used to interact with the Parse database. There are functions to update the confidence for a particular user, to get the confidence of a particular user, and to record the responses that the system receives. This is used by other modules to access and change entries in the Parse database. We used dataInput.js to populate our data initially with data values for Huntsman and Blarneys. 

The user and quality control module, user.js, handles all user information as well as quality control on
a user by user basis. Quality of a user's contribution is measured by whether a user gave a legitimate response. If so, that user's confidence score is increased; if the response is invalid, then the user's confidence score is decreased. 

The space module will handle operations around which spaces are being tracked
by the app. Its database tables will hold all information about the space: the
name, geo-coordinates, and crowding statistics. The module will mostly be
a wrapper for a Parse database, but for the statistics - what times are a space
generally crowded or not, and similar metrics - will require a bit of extra
logic. We will implement this for the final version of our project, but this was not implemented in our initial prototype. 
