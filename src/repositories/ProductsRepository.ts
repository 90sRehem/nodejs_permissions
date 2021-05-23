import { EntityRepository, Repository } from "typeorm";
import Products from "../models/Products";

@EntityRepository(Products)
export default class ProductsRepository extends Repository<Products> {

}