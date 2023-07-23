import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { So } from './so.entity';

@Entity({name:"so_details"})

export class SoDetails {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => So,so=>so.so_Details)
    @JoinColumn({name:'so'})
    so: So

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