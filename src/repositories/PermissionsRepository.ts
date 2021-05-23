import { EntityRepository, Repository } from "typeorm";
import Permission from "../models/Permission";

@EntityRepository(Permission)
export default class PermissionsRepository extends Repository<Permission> {

}