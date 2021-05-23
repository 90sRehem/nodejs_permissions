import { Router } from "express";
import PermissionsController from "../controllers/PermissionsController";

export const PermissionRouter = Router()

PermissionRouter.post('/permissions', PermissionsController.create)