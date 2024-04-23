import { User } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

        //verificar o envio de email
        if(!email){
            throw new Error("Email incorreto")
        }
        //verificar se email está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(userAlreadyExists){
            throw new Error('Email já cadastrado')
        }
//criptografia da senha
        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                
            }
        })


        return user

    }
}
export {CreateUserService}