import json
import boto3
import requests
import base64
import os

db = boto3.client('dynamodb')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notifications')

PUBSUB_API_KEY = os.environ["PUBSUB_API_KEY"]
PUBLISH_NOTIFICATION_ENDPOINT = os.environ["PUBLISH_NOTIFICATION_ENDPOINT"]

def lambda_handler(event, context):
    message = ''
    for record in event['Records']:
        print(record)
        if "food_order" in record['eventSourceARN']:
            message = "Order for meal was successful"
        elif "room_booking" in record['eventSourceARN']:
            message= "Booking request for room number {} was successful".format(1)
        elif "tour_booking" in record['eventSourceARN']:
            message = "Booking request for tour of {} was successful".format(1)
        else:
            message = 'executed'

    #db.put_item(TableName='notifications',Item= {"user_id":{"S":str(user_id)},"message":{"S":str(message)}})
    message = {"data":"", "attributes":{"message":message, "user_id":str(user_id)}}
    res = requests.post(PUBLISH_NOTIFICATION_ENDPOINT, json = {"messages":[message]})
    print(res)
    
    return {
        'statusCode': 200,
        'body': res.json()
    }
