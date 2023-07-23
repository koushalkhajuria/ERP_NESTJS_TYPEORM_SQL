import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PoDetails } from './podetails.entity';

@Entity({name:"po"})

export class Po {
    @PrimaryGeneratedColumn()
    poId: number

    @Column({ type: "timestamp", default: () => "now()"})
    date: Date

    @Column('float', { precision: 10, scale: 2 })
    poValue: number

    @Column()
    supplier: number

    @Column()
    supplierRef: string

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

    @OneToMany(()=>PoDetails,po_Details=>po_Details.po, {eager:true})
    po_Details:PoDetails[];

}