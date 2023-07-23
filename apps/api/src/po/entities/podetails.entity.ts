import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Po } from './po.entity';

@Entity({name:"po_details"})

export class PoDetails {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Po,po=>po.po_Details)
    @JoinColumn({name:'po'})
    po: Po

    @Column()
    itemNo: number

    @Column()
    materialCode: number

    @Column()
    qtyBooked: number

    @Column('float', { precision: 10, scale: 2 })
    unitRate: number

    @Column('float', { precision: 10, scale: 2 })
    total: number

}