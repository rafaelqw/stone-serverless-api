import * as AWS from 'aws-sdk';
import { APIGatewayEvent } from "aws-lambda";
import * as uuid from 'uuid';

export const handle = async (event: APIGatewayEvent) => {
  try {
    if(event.body){
      const tableName = process.env.DYNAMODB_USER_TABLE;

      const body = JSON.parse(event.body);

      const { name, lastname, birth_date, email } = body;
      
      const dynamodb = new AWS.DynamoDB.DocumentClient();

      const exists = await dynamodb.get(
        {
          TableName: tableName as string,
          Key: {
            pk: 'USER',
            sk: `USER#${email}`
          }
        }
      ).promise()

      if(exists.Item){
        return {
          statusCode: 406,
          body: JSON.stringify({
            message: 'User already exists'
          })
        }
      }
      
      const id = uuid.v4();

      await dynamodb.put({
        TableName: tableName as string,
        Item: {
          pk: `USER`,
          sk: `USER#${email}`,
          id,
          name,
          email,
          lastname,
          birth_date,
        },
      }).promise();
      
      return {
        statusCode: 201,
        body: JSON.stringify(
          {
            message: "User created successfully!",
            user: {
              id,
              email,
              name,
              lastname,
              birth_date,
            }
          },
          null,
          2
        ),
      };
    } else {
      return {
        statusCode: 406,
        body: "No data provided"
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
}