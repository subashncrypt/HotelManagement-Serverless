import json
import boto3
import datetime
import urllib3
import random
NOTIFICATION_HANDLER_ENDPOINT = "https://b5vvswudkoufs4qasdjf4gezqi0imqvu.lambda-url.us-east-1.on.aws"

def lambda_handler(event, context):
    # TODO implement
    db = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('tour_booking')
    response = table.scan()
    print(event['body'])
    print(type(event['body']))
    event_body = json.loads(event['body'])
    tour_id=event_body['tour_id']
    tour_name=event_body['tour_name']
    user_id=event_body['user_id']
    head_count=event_body['head_count']
    db.put_item(TableName='tour_booking',Item= {"booking_id":{"N":str(random.randrange(10000000))},"tour_id":{"N":str(tour_id)},"tour_name": {"S":str(tour_name)},"user_id":{'S': str(user_id)},"head_count":{'N': str(head_count)},"TimeStamp":{'S': str(datetime.datetime.now())}})
    response = table.scan()
    
    #Send booking notification
    http = urllib3.PoolManager()
    msg = "Booking request for a tour of {} was successful".format(str(tour_name))
    #res = requests.post(NOTIFICATION_HANDLER_ENDPOINT, json = {"message":msg})
    res = http.request('POST', NOTIFICATION_HANDLER_ENDPOINT, headers={'Content-Type': 'application/json'}, body=json.dumps({"message":msg}))
    print(res)

    return {
        'statusCode': 200,
        'body': res.data.decode('utf-8'),
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }
    }
