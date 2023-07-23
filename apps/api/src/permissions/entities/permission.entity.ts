import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
//import { UserRolesEnum } from '@starter/api-types';
import {BaseEntity} from '../../common/base-entity';
import { Role } from '../../roles/entities/role.entity';

/**
 * User Entity Class
 */
 @Entity({
    name: 'permissions',
  })
  export class Permission extends BaseEntity {
    /**
     * UUID column
     */
    @PrimaryGeneratedColumn()
    id: number;
  
    /**
     * Name column
     */
    @Column()
    action: string;
  
    /**
     * ControllerName column
     */
     @Column()
     subject: string;

    /**
     * serviceName column
     */
    @Column()
    inverted?: boolean;

    @Column()
    fields?: string;

    @Column()
    condition?: string;
    
    /**
     * isActive column : Status is active or not
     */
     @Column({default:true})
     isActive?: boolean;

     @ManyToMany(
      () => Role,
      role => role.permissions,
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager:true},
      )
      roles?: Role[];
}
  
