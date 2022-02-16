import { Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken"
 
interface IPayload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receber o token
  const authtoken = request.headers.authorization
 
  // Validar se token está preenchido
  if(!authtoken) {
    return response.status(401).end()
  }

  const [, token] = authtoken.split(" ")

  try {
    // Validar se token é valido
    const { sub } = verify( token , "36db97ba5ce2d3acce497a0b6cd64e22") as IPayload

    // Recuperar informações do usuário
    request.user_id = sub
    
    return next()
  } catch(err) {
    return response.status(401).end()
  }


}