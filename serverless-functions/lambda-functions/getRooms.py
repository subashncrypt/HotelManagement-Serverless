import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    db = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    room_table = dynamodb.Table('room')
    table = dynamodb.Table('room_booking')
    response_room = room_table.scan()
    response_room_booking = table.scan()
    response = []
    booked_rooms = []
    print(response_room_booking)
    for booked_room in response_room_booking['Items']:
            booked_rooms.append(booked_room['room_no'])
    print(booked_rooms)
    
    for room in response_room['Items']:
        if room['number'] in booked_rooms:
            continue
        else:
            response.append(room)
            
    print(response)
    
    final_response = dict()
    
    final_response['rooms'] = (response)
    print(type(final_response))
    headers = dict()
    headers["Access-Control-Allow-Origin"] = "*"
   
    return {
        "statusCode": 200,
        "body": json.dumps(final_response),
        "headers": headers
    }
