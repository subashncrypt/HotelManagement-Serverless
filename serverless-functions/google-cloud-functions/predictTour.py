from google.cloud import aiplatform
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value
from flask_cors import CORS

CORS()

def predict_tabular_classification_sample(
    project,
    endpoint_id,
    instance_dict,
    location = "us-central1",
    api_endpoint = "us-central1-aiplatform.googleapis.com"
    ):
      aiplatform.init(project=project, location=location)
      # The AI Platform services require regional API endpoints.
      client_options = {"api_endpoint": api_endpoint}

      # Initialize client that will be used to create and send requests.
      # This client only needs to be created once, and can be reused for multiple requests.
      client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
      # for more info on the instance schema, please use get_model_sample.py
      # and look at the yaml found in instance_schema_uri
      instance = json_format.ParseDict(instance_dict, Value())
      instances = [instance]
      parameters_dict = {}
      parameters = json_format.ParseDict(parameters_dict, Value())
      endpoint = client.endpoint_path(
          project=project, location=location, endpoint=endpoint_id
      )
      response = client.predict(
          endpoint=endpoint, instances=instances, parameters=parameters
      )
      print("response")
      print(" deployed_model_id:", response.deployed_model_id)
      # See gs://google-cloud-aiplatform/schema/predict/prediction/tabular_classification_1.0.0.yaml for the format of the predictions.
      predictions = response.predictions
      prediction = 0
      for prediction in predictions:
          print(" prediction:", dict(prediction))
          prediction = dict(prediction)
          max_score = max(prediction['scores'])
          print("max_score",max_score)
          index = prediction['scores'].index(max_score)
          print("index",index)          
          prediction = prediction['classes'][index]
          print("prediction",prediction)          
          return prediction
    

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
    stay_duration = request_json["stay_duration"]
    print("stay_duration",stay_duration)

    predictions = predict_tabular_classification_sample(
    project="coherent-racer-356519",
    endpoint_id="3168343910506299392",
    instance_dict={ "stay_duration": str(stay_duration)},
    location="us-central1",
    api_endpoint = "us-central1-aiplatform.googleapis.com"
    )
    headers = {
        'Access-Control-Allow-Origin': '*'
        }
    return ({"prediction":predictions}, 200, headers)

