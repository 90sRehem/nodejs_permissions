import { compare } from "bcryptjs";
import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { sign } from 'jsonwebtoken'

import UserRepository from "../repositories/UserRepository";

import authConfig from '../config/auth'

class SessionController {
    async create(request: Request, response: Response) {
        const { username, password } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({ username }, { relations: ['roles'] })


        if (!user) {
            return response.status(404).json({ message: 'Esse usuário não existe!' })
        }

        const matchedPassword = await compare(password, user.password)

        if (!matchedPassword) {
            return response.status(404).json({ message: 'O login ou a senha está(ão) incorreto(os)!' })
        }

        const { expiresIn, secret } = authConfig.jwt;

        const roles = user.roles?.map(role => role.slug)

        const token = sign({ roles }, secret, {
            subject: user.id,
            expiresIn
        })

        delete user.password
        return response.json({ user, token })
    }
}

export default new SessionController()