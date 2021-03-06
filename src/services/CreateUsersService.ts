import { getCustomRepository} from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest{
  name:string
  email:string
  admin?: boolean
  passowrd: string
}

class CreateUserService {
  async execute({name,email,admin = false, passowrd} : IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    if(!email){
      throw new Error("Email incorrect")
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    });
    if (userAlreadyExists){
      throw new Error("User already exists")
    }

    const passowrdHash = await hash(passowrd, 8)

    
    const user = usersRepository.create({
      name,
      email,
      admin,
      passowrd: passowrdHash,
    });

    await usersRepository.save(user)

    return user;
  }
}

export {CreateUserService}