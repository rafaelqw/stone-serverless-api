import { DynamoDB } from 'aws-sdk';

const document = new DynamoDB.DocumentClient();

export { document }