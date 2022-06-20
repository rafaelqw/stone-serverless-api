import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it(" should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      lastname: "Lastname",
      email: "test@example.com",
      birth_date: "2022-01-01",
    });

    expect(user).toHaveProperty("id");
  });

  it(" should be able to validate the creation of an existing user", async () => {
    const user = {
      name: "Test",
      lastname: "Lastname",
      email: "test@example.com",
      birth_date: "2022-01-01",
    }

    await usersRepositoryInMemory.create(user);

    await expect(
      createUserUseCase.execute(user)
    ).rejects.toEqual(new AppError("User already exists", 409));
  });
});