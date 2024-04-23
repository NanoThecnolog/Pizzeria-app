import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const {name, email, password} = req.body;

        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return res.json(user)
    }

}

export {CreateUserController}