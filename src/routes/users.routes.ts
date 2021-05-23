import { Router } from "express";
import UserController from "../controllers/UserController";

export const userRouter = Router()

userRouter.post('/users', UserController.create)