import { Router } from "express";
import RolesController from "../controllers/RolesController";

export const RolesRouter = Router()

RolesRouter.post('/roles', RolesController.create)