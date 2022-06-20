import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";
import { document } from '../../../../../shared/infra/dynamodb';

const tableName = process.env.DYNAMODB_USER_TABLE;

class UsersRepository implements IUsersRepository {
  async create({
    name,
    lastname,
    birth_date,
    email,
  }: ICreateUserDTO): Promise<User> {
    const id = uuid.v4();
    
    await document.put({
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
      id,
      name,
      lastname,
      email,
      birth_date
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await document.get(
      {
        TableName: tableName as string,
        Key: {
          pk: 'USER',
          sk: `USER#${email}`
        }
      }
    ).promise()
    
    if(!user.Item){
      return undefined;
    }

    return {
      id: user.Item.id,
      name: user.Item.name,
      lastname: user.Item.lastname,
      email: user.Item.email,
      birth_date: user.Item.birth_date
    }
  }

  async findById(id: string): Promise<User | undefined> {
    const records = await document.query({
      TableName: tableName as string,
      FilterExpression: 'id = :id',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': 'USER',
        ':id': id,
      }
    }).promise()
    
    if(!records.Items || records.Items.length === 0){
      return undefined;
    }

    const user = records.Items[0];

    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      birth_date: user.birth_date
    }
  }
}

export { UsersRepository }