import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/dynamodb/entities/User';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export { IUsersRepository }