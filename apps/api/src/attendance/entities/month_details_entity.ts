import { Column,OneToOne,ManyToOne,PrimaryGeneratedColumn,JoinColumn ,Entity} from "typeorm";
import { Month } from "./attendance.entity";


@Entity({name:"month_details"})



export class MonthDetails{
    @PrimaryGeneratedColumn()
    id:number;  

    @ManyToOne(() => Month,refId=>refId.monthDetails,{eager:true})
    @JoinColumn({name:'refId'})
    refId: Month
    

    @Column()
    date:Date

    @Column({default:null})
    customer1:string
    
    @Column({default:null})
    customer2:string
    
    @Column({default:null})
    SR:number

    @Column({default:null})
    remarks:string

}