import json
import boto3
import datetime
import random
import requests
NOTIFICATION_HANDLER_ENDPOINT = "https://b5vvswudkoufs4qasdjf4gezqi0imqvu.lambda-url.us-east-1.on.aws"

def lambda_handler(event, context):
    # TODO implement
    db = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('room_booking')
    response = table.scan()
    print(event)
    print(type(event))
    event_body = json.loads(event['body'])
    print(type(event_body))
    room_no = event_body['room_no']
    user_id = event_body['user_id']
    check_in = event_body['check_in']
    check_out = event_body['check_out']
    room_type = event_body['room_type']
    Item = {
        "booking_id": {"N": str(random.randrange(10000000))},
        "room_no": {"S": room_no},
        "user_id": {"S": user_id},
        "check_in": {"S": check_in},
        "check_out": {"S": check_out},
        "room_type": {"S": room_type},
        "timestamp": {"S": str(datetime.datetime.now())}
    }
    db.put_item(TableName='room_booking', Item = Item)
    
    response = table.scan()
    
    #Send booking notification
    msg = "Booking request for room number {} was successful".format(str(room_no))
    res = requests.post(NOTIFICATION_HANDLER_ENDPOINT, json = {"message":msg})

    return {
        'statusCode': 200,
        'body': json.dumps(res.json()),
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }
    }
