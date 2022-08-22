import json
import boto3

def lambda_handler(event, context):
    headers = dict()
    headers["Access-Control-Allow-Origin"] = "*"
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('room')
    response = table.scan()
    print(type(response))

    return {
        'statusCode': 200,
        'body': json.dumps(response),
        'headers': headers
    }
