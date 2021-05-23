import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import UserRepository from '../repositories/UserRepository'
import RoleRepository from '../repositories/RolesRepository'

class UserController {
    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository)
        const roleRepository = getCustomRepository(RoleRepository)

        const { name, username, password, roles } = request.body;

        const userExists = await userRepository.findOne({ username })

        if (userExists) {
            return response.status(400).json({ message: 'Usuário já existe!' })
        }

        const hashedPassword = await hash(password, 8)

        const roleExists = await roleRepository.findByIds(roles)

        const user = userRepository.create({
            name,
            username,
            password: hashedPassword,
            roles: roleExists,
        })

        await userRepository.save(user)

        delete user.password

        return response.status(201).json(user)
    }
}

export default new UserController()