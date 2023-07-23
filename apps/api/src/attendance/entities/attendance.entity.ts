import { MonthDetails } from './month_details_entity';
import {Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn,OneToMany} from "typeorm"

@Entity({name:"month"})
export class Month{

@PrimaryGeneratedColumn()
id:number;

@Column()
userId:number

@Column()
month:string

@Column()
year:number

@Column({default:"No"})
submitted: string

@Column({default:"No"})
approved:string

@Column({default:"No"})
rejected:string

@OneToMany(()=>MonthDetails,monthDetails=>monthDetails.refId)
monthDetails:MonthDetails[]
}
