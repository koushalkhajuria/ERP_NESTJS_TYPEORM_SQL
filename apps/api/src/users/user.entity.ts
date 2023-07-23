import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PasswordTransformer } from './password.transformer';
import { UserRoles } from './user-role.entity';
import {BaseEntity} from '../common/base-entity';

/**
 * User Entity Class
 */
@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  /**
   * UUID column
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Username column
   */
  @Column({ unique: true })
  username: string;

  /**
   * Name column
   */
  @Column()
  name: string;

  /**
   * Email column
   */
  @Column()
  email: string;

  /**
   * Mobile column
   */
   @Column()
   mobile: number;

  /**
   * ProfileImage column (gravatar url)
   */
  @Column()
  profileImage: string;

  /**
   * Column to represent a one to many relationship with the roles entity
   */
  @OneToMany(() => UserRoles, (role) => role.user)
  roles: UserRoles[];

  /**
   * Column that employs the PasswordTransformer to hash passwords before writing to database
   */
  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
    select: false,
  })
  @Exclude()
  password: string;

  /**
     * isActive column : Status is active or not
     */
   @Column({default:true})
   isActive: boolean;
}
