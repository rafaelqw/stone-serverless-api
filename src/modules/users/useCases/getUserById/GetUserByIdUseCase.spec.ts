import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { GetUserByIdUseCase } from './GetUserByIdUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let getUserByIdUseCase: GetUserByIdUseCase;

describe("Get User By Id", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    getUserByIdUseCase = new GetUserByIdUseCase(usersRepositoryInMemory);
  });

  it(" should be able to validate an existing user's search", async () => {
    const user = {
      name: "Test",
      lastname: "Lastname",
      email: "test@example.com",
      birth_date: "2022-01-01",
    }
    
    const { id } = await usersRepositoryInMemory.create(user);

    const userFound = await getUserByIdUseCase.execute(id);

    expect(userFound.id).toBe(id);
  });
});