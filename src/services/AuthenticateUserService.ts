import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string
  passowrd : string
}

class AuthenticateUserService {

  async execute({email,passowrd} : IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Passowrd incorrect")
    } 


    const passowrdMatch = await compare(passowrd, user.passowrd)

    if(!passowrdMatch) {
      throw new Error ("Emaail/Passowrd incorrect")
    }

    const token = sign({
      email: user.email
    },"36db97ba5ce2d3acce497a0b6cd64e22",{
      subject : user.id,
      expiresIn : "1d",
    } 
   )
    return token;
  }

}

export {AuthenticateUserService}