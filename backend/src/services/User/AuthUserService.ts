import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        //verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user){
            throw new Error('Email ou senha incorreta!')
        }
        //verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email ou senha incorreta!")
        }

        //gerar token JWT(json web token) e devolver dados como id, nome e email
        //se deu tudo certo gerar o token
        const token = sign(
            {
                name: user.name,
                email: user.email,

            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService};