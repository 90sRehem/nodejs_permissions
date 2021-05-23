import { Router } from 'express';
import { userRouter } from './users.routes';
import { SessionRouter } from './session.routes';
import { PermissionRouter } from './permission.routes';
import { RolesRouter } from './role.routes';
import { ProductRouter } from './products.routes';

export const routes = Router()

routes.use(userRouter)
routes.use(SessionRouter)
routes.use(PermissionRouter)
routes.use(RolesRouter)
routes.use(ProductRouter)
