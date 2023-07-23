import { BaseEntity } from './../../common/base-entity';
import {Column,Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn} from "typeorm"
@Entity({name:"materials"})
export class Materials extends BaseEntity{

@PrimaryGeneratedColumn()
matId:number;

@Column()
subId:number;

@Column()
hsn:string

@Column()
typeNo:string

@Column()
shortDesc:string

@Column()
longDesc:string

@Column()
manufacturer:string

@Column({default:true})
keepSrNo:boolean

@Column()
location:string

@Column()
userId:number

}