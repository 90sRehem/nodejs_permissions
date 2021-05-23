import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { is } from "../middlewares/permissions";

export const ProductRouter = Router()

ProductRouter.post('/products', is(['gerente']), ProductController.create)
ProductRouter.get('/products', ProductController.index)
ProductRouter.get('/products/:slug', is(['Gerente2']), ProductController.show)