
ACCEPTABLE = [ 'yes', 'no', 'y', 'n', '1', '0', \
        'ya', 'yer', 'ner', 'yee', 'yea dawg',  \
        'yea', 'tots', 'nah dawg, that ain\'t me', \
        'nope', 'ALL HAIL SATAN' ]

def record(response):
    pid, answer = response 

    if answer.lower() not in ACCEPTABLE:
        confidence = db.user.get_confidence()
        db.user.update_confidence(confidence - 1)

