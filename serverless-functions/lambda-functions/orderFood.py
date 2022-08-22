import json
import boto3
import datetime
from decimal import Decimal
import requests
import random

NOTIFICATION_HANDLER_ENDPOINT = "https://b5vvswudkoufs4qasdjf4gezqi0imqvu.lambda-url.us-east-1.on.aws"


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('food_order')
    response = table.scan()
    food_before=event['food']
    user_id=event['user_id']
    food=json.loads(json.dumps(food_before), parse_float=Decimal)
    # db.put_item(TableName='tour_booking',Item= {"id":{"N":str(len(response['Items'])+1)},"tour_id":{"N":str(tour_id)},"tour_name": {"S":str(tour_name)},"user_id":{'N': str(user_id)},"head_count":{'N': str(head_count)},"TimeStamp":{'S': str(datetime.datetime.now())})
    # Referred from https://stackoverflow.com/questions/66824695/how-do-i-add-a-list-of-dict-to-dynamodb-using-the-put-item-method-in-boto3
    table.put_item(
        Item={
                'order_id': str(random.randrange(10000000)),  
                'food': food,
                'user_id': user_id,
                'TimeStamp': str(datetime.datetime.now())

        }
        )
    
    response = table.scan()
    
    #Send booking notification
    msg = "Booking request for meal was successful"
    res = requests.post(NOTIFICATION_HANDLER_ENDPOINT, json = {"message":msg})
    print(res)


    return {
        'statusCode': 200
        'body': response['item']
    }