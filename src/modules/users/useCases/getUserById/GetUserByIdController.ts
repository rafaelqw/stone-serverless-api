import { APIGatewayEvent } from "aws-lambda";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../infra/dynamodb/repositories/UsersRepository";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

class GetUserByIdController {
  async handle(event: APIGatewayEvent): Promise<{statusCode: number; body: any }>{
    try {
      if(event.pathParameters && event.pathParameters.id){
        const { id } = event.pathParameters;
  
        const usersRepository = new UsersRepository();
        const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
  
        const user = await getUserByIdUseCase.execute(id);
  
        return {
          statusCode: 200,
          body: JSON.stringify(user)
        };
      } else {
        return {
          statusCode: 406,
          body: JSON.stringify({
            message: "Missing id parameter",
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

export { GetUserByIdController }