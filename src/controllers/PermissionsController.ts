import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import PermissionsRepository from "../repositories/PermissionsRepository";

class PermissionsController {
    async create(request: Request, response: Response) {
        const { name, slug, description } = request.body;

        const permissionsRepository = getCustomRepository(PermissionsRepository);

        const permissionExist = await permissionsRepository.findOne({ slug });

        if (permissionExist) {
            return response.status(400).json({ message: 'Já existe uma permissão de sse tipo!' })
        }

        const permission = permissionsRepository.create({ name, slug, description })

        await permissionsRepository.save(permission)

        return response.status(201).json({ permission })
    }
}

export default new PermissionsController()