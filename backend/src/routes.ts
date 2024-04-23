import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/User/CreateUserController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { DetailUserController } from "./controllers/User/DetailUserController";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { ListCategoryController } from "./controllers/Category/ListCategoryController";
import { CreateProductController } from "./controllers/Product/CreateProductController";
import { ListByCategoryController } from "./controllers/Product/ListByCategoryController";
import { CreateOrderController } from "./controllers/Order/CreateOrderController";
import { RemoveOrderController } from "./controllers/Order/RemoveOrderController";
import { AddItemController } from "./controllers/Order/AddItemController";
import { RemoveItemController } from "./controllers/Order/RemoveItemController";
import { SendOrderController } from "./controllers/Order/SendOrderController";
import { ListOrdersController } from "./controllers/Order/ListOrdersController";
import { DetailOrderController } from "./controllers/Order/DetailOrderController";
import { FinishOrderController } from "./controllers/Order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from './config/multer';


const router = Router();
const upload = multer(uploadConfig.upload("./temp"));

//--Rotas User
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

//--Rotas Category

router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//--Rotas Product
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//--Rotas Order
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router };