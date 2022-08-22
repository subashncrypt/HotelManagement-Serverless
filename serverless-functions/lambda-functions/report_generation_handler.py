import json
import urllib3
import boto3
import time
from google.cloud import storage
import datetime


def lambda_handler(event, context):
    # TODO implement
    storage_client = storage.Client.from_service_account_json('coherent-racer-356519-c838ed3868b6.json')
    
    print(event['body'])
    event_body = json.loads(event['body'])
    #print(event_body)
    #print(type(event_body))
    event_type=event_body['event_type']
    user_email=event_body['user_email']
    timestamp=event_body['timestamp']
    date=event_body['date']

    client = boto3.client('s3')
    bucket_name = 'logs-csci5410-group18'
    file_name = 'stats_data.csv'
    
    stats_file = client.get_object(Bucket=bucket_name, Key=file_name)
    file_content = stats_file['Body'].read()
    file_content = file_content.decode("utf-8")
    print("file content: ", file_content)
    data = file_content
    data = data + '\n' + event_type + ',' + user_email + ',' + timestamp + ',' + date
    print("final data: ", data)
    
    client.put_object(Body=data, Bucket=bucket_name, Key=file_name)
    
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(file_name)
    
    blob.upload_from_string(data)
    time.sleep(5)
    
    res = dict()
    res = {"status" : "success"}

    return {
        'statusCode': 200,
        'body': json.dumps(res),
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }
    }