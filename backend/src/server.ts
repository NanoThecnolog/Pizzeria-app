import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { router } from "./routes";
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors())

app.use(router);

//criando rota estática para acesso aos arquivos no front
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'temp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        //se for instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'Error',
        message: 'Internal server error'
    })
})

app.listen(3333, () => console.log("servidor online!!"));
