import { Column, Entity, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

import { UserRolesEnum } from '@starter/api-types';

import { User } from './user.entity';
import {BaseEntity} from '../common/base-entity';
import { Role } from '../roles/entities/role.entity';
import { Subscription } from '../subscription/entities/subscription.entity';

/**
 * User Roles Entity Class
 */
@Entity()
export class UserSubRoles extends BaseEntity {
  /**
   * UUID column
   */
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @PrimaryColumn({ name: 'subId' })
  subId: number;

  @PrimaryColumn({ name: 'roleId' })
  roleId: number;


  /**
   * Column to represent a one to one relationship with the Role entity
   */
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE', onUpdate:'CASCADE'
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  //roles: Role[];

  /**
   * Column to represent a one to one relationship with the Role entity
   */
   @ManyToOne(() => Role, (role) => role.id, {
    onDelete: 'CASCADE', onUpdate:'CASCADE'
  })
  @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
  role: Role;

  /**
   * Column to represent a one to one relationship with the Subscription entity
   */
   @ManyToOne(() => Subscription, (sub) => sub.id, {
    onDelete: 'CASCADE', onUpdate:'CASCADE'
  })
  @JoinColumn([{ name: 'subId', referencedColumnName: 'id' }])
  sub: Subscription;
}
