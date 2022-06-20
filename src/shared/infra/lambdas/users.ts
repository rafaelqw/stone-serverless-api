import { APIGatewayEvent } from "aws-lambda";
import { CreateUserController } from "../../../modules/users/useCases/createUser/CreateUserController";
import { GetUserByIdController } from "../../../modules/users/useCases/getUserById/GetUserByIdController";

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();

export const createUser = createUserController.handle;
export const getUserById = getUserByIdController.handle;