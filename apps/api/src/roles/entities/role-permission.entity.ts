import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn} from 'typeorm';

import { UserRolesEnum } from '@starter/api-types';

import { Role } from './role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import {BaseEntity} from '../../common/base-entity';

/**
 * User Roles Entity Class
 */
@Entity('role_permissions')
export class RolePermissions extends BaseEntity {
  /**
   * UUID column
   */
  //@PrimaryGeneratedColumn()
  //id: number;

  /**
     * roleId column
     */
   //@Column()
   //roleId: string;

  /**
   * Column for role based access
   * Beware this default app role will permit every created profile to delete other profiles
   */
  /*@Column({
    type: 'enum',
    enum: UserRolesEnum,
    default: UserRolesEnum.SUDO,
  })
  role: UserRolesEnum;
  */

  /**
   * Column to represent a many to one relationship with the permission entity
   */
  /*@ManyToOne(() => Permission, (permission) => permission, {
    onDelete: 'CASCADE',
  })
  permission: string;*/

  /**
   * Column to represent a many to one relationship with the profile entity
   */
   /*@ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  role: Role;
  */

  @PrimaryColumn({ name: 'roleId' })
  roleId: number;

  @PrimaryColumn({ name: 'permissionId' })
  permissionId: number;

  @ManyToOne(
    () => Role,
    role => role.permissions,
    {onDelete: 'CASCADE', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
  roles: Role[];

  @ManyToOne(
    () => Permission,
    permission => permission.roles,
    {onDelete: 'CASCADE', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'permissionId', referencedColumnName: 'id' }])
  permission: Permission[];

}
