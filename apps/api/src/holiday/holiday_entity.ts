import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Holiday{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'date'})    
    date:string

    @Column()
    description:string
    
}