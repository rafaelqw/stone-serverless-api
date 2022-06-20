import { User } from '../../infra/dynamodb/entities/User';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    lastname,
    email,
    birth_date,
  }: ICreateUserDTO): Promise<User> {
    const exists = await this.usersRepository.findByEmail(email);

    if(exists){
      throw new AppError('User already exists', 409);
    }
    
    const user = await this.usersRepository.create({
      name,
      lastname,
      email,
      birth_date,
    });

    return user;
  }
}

export { CreateUserUseCase }