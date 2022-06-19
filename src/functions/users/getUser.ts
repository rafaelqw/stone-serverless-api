import { APIGatewayEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';

export const handle = async (event: APIGatewayEvent) => {
  try {
    const tableName = process.env.DYNAMODB_USER_TABLE;
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    if(event.pathParameters && event.pathParameters.id){
      const { id } = event.pathParameters;
      
      const records = await dynamodb.query({
        TableName: tableName as string,
        FilterExpression: 'id = :id',
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
          ':pk': 'USER',
          ':id': id,
        }
      })
      .promise()

      if(!records.Items || records.Items.length === 0){
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: 'User not found'
          })
        }
      }

      const user = records.Items[0];

      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            birth_date: user.birth_date,
          },
          null,
          2
        ),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing id parameter'
        })
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
}