import random 

places = [ 'Huntsman QSL 1st Floor', 'Huntsman QSL 2nd Floor', 'Huntsman Computer Lab 380', \
        'Huntsman Computer Lab 385', 'Saxbys', 'HubBub', 'Joe\'s Cafe', 'Smokey Joes', \
        'Tap House', 'Sweet Green', 'Chipotle' ]

users = [ str(random.randrange(1000)) for i in xrange(50) ]

print 'places,',
print ','.join(users)

for place in places:
    row = [ place ]
    for user in users:
        if random.random() > 0.5:
            row.append(random.choice(['0', '0', '1']))
        else:
            row.append('""')

    print ','.join(row)
