import db
import numpy
numpy

"""
returns current decision and confidence score 
for the given responses (res) 
"""
def score(res):
    if len(res) == 0:
        return True, 0

    avg = numpy.average(res)
    if avg > 0.5:
        return True, float(avg * 100)
    else:
        return False, float((1 - avg) * 100)
    
