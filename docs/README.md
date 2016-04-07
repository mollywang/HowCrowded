# HowCrowded

![How Crowded](HowCrowded.png)

HowCrowded is a web app for people who want to know crowded places are before they
have to make the effort to travel there. This is applicable for everyone from 
restaurant and bar-goers to neurotic students looking for a carrel in Huntsman 
or empty desk in Van Pelt.

Video Pitch:	https://vimeo.com/157685908

## Project Component:

### Server Backend

The primary component of the project will be the backend server application,
which will consist of a space module, an aggregation module, a user module, and
a communications module.

The space module will handle operations around which spaces are being tracked
by the app. Its database tables will hold all information about the space: the
name, geo-coordinates, and crowding statistics. The module will mostly be
a wrapper for a Parse database, but for the statistics - what times are a space
generally crowded or not, and similar metrics - will require a bit of extra
logic.

The communications module handles all communications to users. It should be
able to notifiy users asking whether their current location is crowded or not,
or letting them know an answer to a query they've asked. It will also listen
for client communications, which could be sent when asking or answering
a question, or when checking into a tracked space.  

The aggregation module will take all the data provided by the communications
module and make the decisions on whether a space is truly crowded. It could
refer to the space module as well to determine if the answer matches with the
statistics for the space.

The user module handles all user information as well as quality control on
a user by user basis. All account operations (signing in, signing up, changing
password, etc.) will be specified here. Individual's quality will also be
stored here, so when the aggragation module needs to know a users reliablity or
if itdecides a user's report wasn't consistant with its decision, it will go
through the user module.

Finally, the server will need have some coordinating logic between the modules
as well as keeping an open query count. 

### Component Complexity

Components should have the following approximate relative complexity:
| Component            | Points |
| -------------------- | ------ |
| Space Module         | 2      |
| Communcations Module | 4      |
| Aggregation Module   | 4      |
| User Module          | 2      |
| Web App              | 3      |

## Data:
Data is stored in .csv file with 24 columns representing 24 hours of the day. Each column will have a decimal value between 0 and 1 that is the average of people's responses to the question "Is this place crowded?" with Yes being 1 and No being 0. Each location will have its own .csv file with this data.

### Quality Control Module:
Our quality control will be performed through user input: after someone receives an answer to a question they've asked, they will answer "yes" or "no" to the question "Was this a valid answer?" If the answer is yes (the response was a "yes" or a "no"), then we'll pass the data to the aggregation module and aggregate it into our dataset and the user who contributed it will receive credit for contributing. If it's not valid (for example, someone sends back "nsksdajne" or "car"), then the answerer gave a bad answer and they won't receive any credit and the data won't be integrated into our dataset.

Since the answers of "yes" and "no" can be subjective, it's hard to validate whether or not the user gave a truthful answer. We're working on figuring out a way to reconcile this.

### Aggregation Module:
If the answer is deemed quality, then the answer will be aggregated into the current data for the given place and time. If, for example, we received a "yes" that Smokes is busy at 11:30 pm, we will find the information in our database for Smokes and the hour 23:00-24:00.

Let's say Smokes has an average score of 0.680 and 14 recorded responses for hour 23:00-24:00. With a 15th input of "yes", we'll update the score like this:

((0.680 * 14) + 1) / 15 = 0.701

This is just calculating the new average by integrating the new answer. We'll update the score to 0.701 and the count to 15 and then process the next input, if any.
