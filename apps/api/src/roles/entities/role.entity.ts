import { Column, Entity, OneToMany,ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
//import { UserRolesEnum } from '@starter/api-types';
import {BaseEntity} from '../../common/base-entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { RolePermissions } from './role-permission.entity';

/**
 * User Entity Class
 */
 @Entity({
    name: 'roles',
  })
  export class Role extends BaseEntity {
    /**
     * UUID column
     */
    @PrimaryGeneratedColumn()
    id: number;
  
    /**
     * Name column
     */
    @Column({ unique: true })
    name: string;

    /**
     * IsActive column : status is active or not
     */
     @Column({default:true})
     isActive: boolean;

    /**
   * Column to represent a one to many relationship with the permissions entity
   */
    /*@OneToMany(() => RolePermissions, (permission) => permission.role)
    permissions: RolePermissions[];
    */
    @ManyToMany(
        () => Permission, 
        permission => permission.roles, //optional
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
        @JoinTable({
          name: 'role_permissions',
          joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
          },
          inverseJoinColumn: {
            name: 'permissionId',
            referencedColumnName: 'id',
          },
        })
        permissions: Permission[];
      
  }
  
