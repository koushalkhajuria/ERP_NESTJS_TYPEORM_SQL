import { BaseEntity } from '../../common/base-entity';
import {Column,Entity,JoinColumn,OneToOne,PrimaryColumn,PrimaryGeneratedColumn} from "typeorm"
@Entity({name:"customers"})
export class Customers extends BaseEntity{ 

    @PrimaryGeneratedColumn()
    cusId:number;
    
    @Column({default:null})
    subId:number
    
    @Column({default:null})
    companyName:string
    
    @Column({default:null})
    addressL1:string
    
    @Column({default:null})
    addressL2:string
    
    @Column({default:null})
    pinCode:number
    
    @Column({default:null})
    state:string

    @Column({default:null})
    cin:string
    
    @Column({default:null})
    gstin:string
    
    @Column({default:null})
    pancard:string

    @Column({default:null})
    userId:number
  
  
    
    }