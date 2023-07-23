import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
//import { UserRolesEnum } from '@starter/api-types';
import {BaseEntity} from '../../common/base-entity';

/**
 * User Entity Class
 */
 @Entity({
    name: 'subscriptions',
  })
  export class Subscription extends BaseEntity {
    /**
     * UUID column
     */
    @PrimaryGeneratedColumn()
    id: number;
  
    /**
     * Title column
     */
    @Column({ unique: true })
    title: string;
  
    /**
     * Description column
     */
    @Column()
    description: string;

    /**
     * Cost column
     */
     @Column()
     cost: number;

    /**
     * isActive column : Status is active or not
     */
     @Column({default:true})
     isActive: boolean;
  }
  
