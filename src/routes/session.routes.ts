import { Router } from "express";
import SessionController from "../controllers/SessionController";

export const SessionRouter = Router()

SessionRouter.post('/session', SessionController.create)