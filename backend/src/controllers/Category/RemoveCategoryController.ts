import { Request, Response } from "express";
import { RemoveCategoryService } from "../../services/category/RemoveCategoryService";

class RemoveCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        const removeCategoryService = new RemoveCategoryService();

        const category = await removeCategoryService.execute({
            category_id
        })
        return res.json(category);
    }
}

export { RemoveCategoryController };