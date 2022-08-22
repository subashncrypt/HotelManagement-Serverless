from google.cloud import firestore
from google.cloud import language
from flask_cors import CORS

CORS()
languages = language.LanguageServiceClient()
client = firestore.Client()

def hello_world(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    request_json = request.get_json()
    user_email = request_json['user_email']
    feedback = request_json['feedback']


    # type_ = language.enums.Document.Type.PLAIN_TEXT
    document = {"content": feedback, "type_": "PLAIN_TEXT", "language": "en"}
    response = languages.analyze_sentiment(request = {'document': document, 'encoding_type': "UTF8"})
    score = response.document_sentiment.score
    print(score)

    polarity = "Neutral"

    if(score>0):
        polarity = "Positive"
    else:
        polarity = "Negative"
    
    doc_ref = client.collection(u'reviews')
    docs = doc_ref.stream()
   
    doc_ref.document().set({
    u'user_email':user_email,
    u'feedback': feedback,
    u'score':polarity
  })

    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    return (polarity, 200, headers)
