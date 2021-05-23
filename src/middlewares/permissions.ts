import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import User from "../models/User";

import UserRepository from "../repositories/UserRepository";

async function decoder(request: Request): Promise<User | undefined> {
    const authHeader = request.headers.authorization || '';

    const userRepository = getCustomRepository(UserRepository)

    const [, token] = authHeader?.split(" ");

    const payload = decode(token)

    const user = await userRepository.findOne(payload?.sub, { relations: ['roles'] })

    return user;
}

export function is(role: string[]) {
    const roleAuthorized = async (request: Request, response: Response, next: NextFunction) => {
        const user = await decoder(request);

        const isAuthenticated = request.headers?.authorization

        if (!isAuthenticated) {
            return response.status(401).json({ message: "Não autorizado1!" })
        }

        const userRoles = user?.roles.map(role => role.slug)

        const rolesExists = userRoles?.some(r => role.includes(r))

        if (rolesExists) {
            return next()
        }

        return response.status(401).json({ message: "Não autorizado!" })
    }

    return roleAuthorized
}