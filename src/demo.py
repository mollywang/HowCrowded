import csv
import aggragation

responses = {}

with open('input.csv') as datafile:
    data = csv.reader(datafile) 
    for row in data:
        responses[row[0]] = [ int(x) for x in filter(lambda(x): len(x) > 0, row[1:]) ]

for place in responses:
    score, confidence = aggragation.score(responses[place])

    print '{} is {} with confidence {:.2f}%'.format(place, \
            'crowded' if score else 'not crowded', confidence)
