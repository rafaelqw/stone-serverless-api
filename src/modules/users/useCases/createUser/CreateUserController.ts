import { APIGatewayEvent } from "aws-lambda";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepository } from "../../infra/dynamodb/repositories/UsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(event: APIGatewayEvent): Promise<{statusCode: number; body: any }>{
    try {
      if(event.body){
        const { name, lastname, birth_date, email } = JSON.parse(event.body) as ICreateUserDTO;
  
        const usersRepository = new UsersRepository();
        const createUserUseCase = new CreateUserUseCase(usersRepository);
  
        const user = await createUserUseCase.execute({
          name,
          lastname,
          birth_date,
          email,
        });
  
        return {
          statusCode: 201,
          body: JSON.stringify({
            message: "User created successfully!",
            user
          })
        };
      } else {
        return {
          statusCode: 406,
          body: JSON.stringify({
            message: "Requisition body not sent",
          })
        };
      }
    } catch(error) {
      if (error instanceof AppError) {
        return {
          statusCode: error.statusCode,
          body: JSON.stringify({
            message: error.message,
          })
        };
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: "error",
          message: error.message,
        }),
      };
    }
  }
}

export { CreateUserController }