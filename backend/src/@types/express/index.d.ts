//adição da variavel user_id ao express. Depois disso ir ao tsconfig, procurar "typeRoots", descomentar, passar caminho do arquivo @types

declare namespace Express {
    export interface Request {
        user_id: string;
    }
}