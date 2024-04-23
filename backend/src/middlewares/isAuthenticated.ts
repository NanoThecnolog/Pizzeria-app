import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;    
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //aqui recebe o token(vem sempre dento do req.headers.authorization)
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }
    //desconstruindo a resposta do servidor e salvando o token. método split usado de tal forma a separar os elementos que estão entre espaços e ignorar o primeiro elemento(2 recebidos), salvando o segundo como token

    const [, token] = authToken.split(" ")

    //validar o token

    try {
        const {sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;
        //recuperar id do token e colocar dentro da variável user_id dentro do req

        req.user_id = sub;

        return next();

    } catch(err){
        return res.status(401).end();
    }

}