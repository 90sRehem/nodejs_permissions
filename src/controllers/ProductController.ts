import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import ProductsRepository from '../repositories/ProductsRepository'

class ProductsController {
    async create(request: Request, response: Response) {
        const productsRepository = getCustomRepository(ProductsRepository)

        const { name, description, slug } = request.body;

        const productExists = await productsRepository.findOne({ slug })

        if (productExists) {
            return response.status(400).json({ message: 'Este produto já existe!' })
        }

        const product = productsRepository.create({
            name,
            description,
            slug,
        })

        await productsRepository.save(product)

        return response.status(201).json({ product })
    }

    async index(request: Request, response: Response) {
        const productsRepository = getCustomRepository(ProductsRepository)
        const products = await productsRepository.find()

        if (!products.length) {
            return response.status(404).json({ 'message': 'Nenhum produto encontrado.' })
        }

        return response.status(200).json(products)
    }

    async show(request: Request, response: Response) {
        const { slug } = request.params
        const productsRepository = getCustomRepository(ProductsRepository)
        const product = await productsRepository.findOne({ slug })

        if (!product) {
            return response.status(404).json({ 'message': 'Nenhum produto encontrado.' })
        }

        return response.status(200).json(product)
    }
}

export default new ProductsController()