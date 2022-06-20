import * as uuid from 'uuid';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/dynamodb/entities/User';
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    lastname,
    email,
    birth_date
  }: ICreateUserDTO): Promise<User> {
    const id = uuid.v4();

    const user: User = {
      id,
      name,
      lastname,
      email,
      birth_date
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email)

    if(!user){
      return undefined;
    }

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id)

    if(!user){
      return undefined;
    }

    return user;
  }
}

export { UsersRepositoryInMemory };