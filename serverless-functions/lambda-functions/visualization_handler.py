import json
import urllib3
import boto3
import time
import re
from google.cloud import storage

def lambda_handler(event, context):
    # TODO implement
    #url = "https://us-central1-coherent-racer-356519.cloudfunctions.net/store_visualization_data"
    storage_client = storage.Client.from_service_account_json('coherent-racer-356519-c838ed3868b6.json')

    db = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    
    table_room = dynamodb.Table('room')
    table_room_booking = dynamodb.Table('room_booking')
    
    response_room = table_room.scan()
    response_room_booking = table_room_booking.scan()
    room_income = 0
    
    for booked_room in response_room_booking['Items']:
            for room in response_room['Items']:
                if room['number'] == booked_room['room_no']:
                    room_income = room_income + int(room['price'])
    print("Income from room bookings:", room_income)
    
    table_tour = dynamodb.Table('tour')
    table_tour_booking = dynamodb.Table('tour_booking')
    
    response_tour = table_tour.scan()
    response_tour_booking = table_tour_booking.scan()
    tour_income = 0
    
    for booked_tour in response_tour_booking['Items']:
            for tour in response_tour['Items']:
                if tour['id'] == booked_tour['tour_id']:
                    tour_income = tour_income + tour['price']
    print("Income from tour bookings:", tour_income)
    
    table_food = dynamodb.Table('Food')
    table_food_order = dynamodb.Table('food_order')
    
    response_food = table_food.scan()
    response_food_order = table_food_order.scan()
    food_income = 0
    food_items = {}
    print(response_food_order)
    #print(response_food)
    print(response_food_order['Items'])
    for ordered_food in response_food_order['Items']:
        print((ordered_food))
        if ordered_food['food'][0] == '[':
            regex = re.search('{(.*)}', ordered_food['food']).group(1)
            list_of_items = regex.split("},{")
            print("items: ", list_of_items)
            for item in list_of_items:
                item = str(item).replace('"', "'")
                item = '{' + item  + '}'
                item = item.replace("'", "\"")
                item = json.loads(item)
                
                food_income = food_income + item['totalPrice']
                
                if item['name'] in food_items:
                    qty_previous = int(food_items[item['name']])
                    food_items[item['name']] = qty_previous + int(item['qty'])
                else:
                    food_items[item['name']] = int(item['qty'])
        else:
            food_income = food_income + 10
            if ordered_food['food'] in food_items:
                qty_previous = int(food_items[ordered_food['food']])
                food_items[ordered_food['food']] = qty_previous + 1
            else:
                food_items[ordered_food['food']] = 1
                    
         
    print("Income from food orders:", food_income)
    print("food orders:", food_items)
    
    profit_margin = 0.2
    room_profit = round(int(room_income)*profit_margin)
    food_profit = round(int(food_income)*profit_margin)
    tour_profit = round(int(tour_income)*profit_margin)
    
    total_prodit = room_profit + food_profit + tour_profit
    
    
    income_csv_data = "Income Type,income\n" + "Room bookings," + str(room_income) + "\n" + "Tour bookings," + str(tour_income) + "\n" + "Food orders," + str(food_income) + "\n"
    profit_csv_data = "Profit Source,profit\n" + "Room," + str(room_profit) + "\n" + "Tour," + str(tour_profit) + "\n" + "Food," + str(food_profit) + "\n"
    food_csv_data = "Food item,Quantity"
    
    for item in food_items.keys():
        print(item)
        print(food_items[item])
        food_csv_data = food_csv_data + "\n" + item + "," + str(food_items[item])
    
    print(food_csv_data)
    
    #client = boto3.client('s3')
    
    bucket_name = 'visualization-csci5410-group18'
    file_name = 'income_data.csv'
    file_name_profit = 'profit_data.csv'
    file_name_food = 'food_order_data.csv'
    
    bucket = storage_client.bucket(bucket_name)
    blob_income = bucket.blob(file_name)
    blob_profit = bucket.blob(file_name_profit)
    blob_food = bucket.blob(file_name_food)

    blob_income.upload_from_string(income_csv_data)
    time.sleep(5)
    blob_profit.upload_from_string(profit_csv_data)
    time.sleep(5)
    blob_food.upload_from_string(food_csv_data)

    
    return {
            'statusCode': 200,
            'body': 'Succesfully transferred data to Google cloud storage',
            'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        },
    }