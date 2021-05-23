import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Permission from "./Permission";

@Entity('roles')
export default class Roles {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    slug: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'permissions_roles',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }],

    })
    permissions: Permission[]
}