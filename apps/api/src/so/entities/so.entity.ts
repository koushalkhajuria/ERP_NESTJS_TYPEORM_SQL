import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { SoDetails } from './sodetails.entity';

@Entity({name:"so"})

export class So {
    @PrimaryGeneratedColumn()
    soId: number

    @Column({ type: "timestamp", default: () => "now()"})
    date: Date

    @Column('float', { precision: 10, scale: 2 })
    soValue: number

    @Column()
    customer: number

    @Column()
    customerRef: string

    @Column()
    contactName: string

    @Column()
    contactDetails: string

    @Column()
    paymentTerms: string

    @Column()
    paymentDate: Date

    @Column()
    deliveryDate: Date

    @Column({default:"open"})
   status: string

    @Column()
    remarks: string

    @OneToMany(()=>SoDetails,so_Details=>so_Details.so, {eager:true})
    so_Details:SoDetails[];

}