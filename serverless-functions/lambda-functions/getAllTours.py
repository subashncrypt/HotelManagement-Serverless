import json
import boto3
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Decimal):
      return str(obj)
    return json.JSONEncoder.default(self, obj)
    
def lambda_handler(event, context):
    response = {}
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('tour')
        response = table.scan()
    except Exception as e:
        raise e
        print(e)

    return {
        'statusCode': 200,
        'body': json.dumps(response, cls=DecimalEncoder)
,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        },
    }
