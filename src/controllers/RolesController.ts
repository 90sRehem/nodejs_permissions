import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PermissionsRepository from "../repositories/PermissionsRepository";

import RolesRepository from "../repositories/RolesRepository";

class PermissionsController {
    async create(request: Request, response: Response) {
        const { name, slug, description, permissions } = request.body;

        const rolesRepository = getCustomRepository(RolesRepository);
        const permissionsRepository = getCustomRepository(PermissionsRepository);

        const roleExist = await rolesRepository.findOne({ slug });

        if (roleExist) {
            return response.status(400).json({ message: 'Já existe uma permissão de sse tipo!' })
        }

        const permissionsExist = await permissionsRepository.findByIds(permissions)

        const role = rolesRepository.create({
            name,
            slug,
            description,
            permissions: permissionsExist
        })

        await rolesRepository.save(role)

        return response.status(201).json({ role })
    }
}

export default new PermissionsController()