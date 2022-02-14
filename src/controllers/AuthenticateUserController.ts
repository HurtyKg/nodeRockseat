import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"


class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, passowrd} = request.body

    const authenticateUserService = new AuthenticateUserService

    const token = await authenticateUserService.execute({
      email,
      passowrd
    });

    return response.json(token)

  }
}

export {AuthenticateUserController}