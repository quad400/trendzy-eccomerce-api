import jwt from "jsonwebtoken"
import {config} from "dotenv"

config()

export const signToken = (id: string, email: string)=>{
    return jwt.sign({id, email}, process.env.TOKEN_SECRET!,{expiresIn:"1d"})
}