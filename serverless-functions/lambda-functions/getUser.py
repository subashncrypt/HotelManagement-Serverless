import json
import boto3
import datetime
import random

def lambda_handler(event, context):
    # TODO implement
    db = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('UserRegistration')
    
    event_body = json.loads(event['body'])
    #event_body = event
    email = event_body['email']
    
    response = table.get_item(Key={'email': email})

    return {
        'statusCode': 200,
        'body': json.dumps(response["Item"]),
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }
    }
