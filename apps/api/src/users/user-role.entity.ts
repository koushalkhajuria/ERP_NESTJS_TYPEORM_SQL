import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserRolesEnum } from '@starter/api-types';

import { User } from './user.entity';
import {BaseEntity} from '../common/base-entity';

/**
 * User Roles Entity Class
 */
@Entity()
export class UserRoles extends BaseEntity {
  /**
   * UUID column
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Column for role based access
   * Beware this default app role will permit every created profile to delete other profiles
   */
  @Column({
    default: "user",
  })
  role: string;

  /**
   * Column to represent a many to one relationship with the profile entity
   */
  @ManyToOne(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  user: User;
}
