import json
import requests
import boto3

def lambda_handler(event, context):
    try:
        # Extract data from message
        body = json.loads(event["body"])
        attributes = body["message"]["attributes"]
        service = attributes['service']
        
        # To prevent execution twice
        messageId = body["message"]["messageId"]
        print(messageId)
        db = boto3.client('dynamodb')
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('PubSub_Processed_Messages')
        response = table.scan()
        
        for item in response["Items"]:
            if item["messageId"] == messageId:
                 return {'statusCode': 200,'body': 'Message already processed'}
            
        table.put_item(Item={'messageId': str(messageId)})
        
        
        if service == 'ROOM_SERVICE':
             url = 'https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/rooms/bookroom'
        elif service == 'MEAL_SERVICE':
            url = 'https://ctc3jdmwtrfknrhcdmi2opb5sa0hiqpy.lambda-url.us-east-1.on.aws'
        elif service == 'TOUR_SERVICE':
            url = 'https://ds3ikau3tl.execute-api.us-east-1.amazonaws.com/dev/tour'
        else:
            url = ''
        
        print(attributes)
        
        # Make a request to corresponding booking microservice
        req = requests.post(url, json = attributes)
        print(req)
        
    except Exception as e:
        print(e)
    return {
        'statusCode': 200,
        'body': json.dumps(event)
    }
