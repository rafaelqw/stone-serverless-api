import { User } from '../../infra/dynamodb/entities/User';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

class GetUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if(!user){
      throw new AppError('User not found');
    }

    return user;
  }
}

export { GetUserByIdUseCase }