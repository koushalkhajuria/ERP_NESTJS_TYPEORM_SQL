import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm"

@Entity({ name: "work_flow" })

export class WorkFlow {

    @PrimaryGeneratedColumn()
    workflowNo: number

    @Column()
    userId: number
    
    @Column()
    refId: number

    @Column()
    description: string

    @Column()
    initiator: string

    @Column()
    timeStamp: Date

    @Column()
    pendingWith: string

    @Column()
    wstatus: string

    @Column()
    followDateInitiator: Date

    @Column()
    followDatePendingWith: Date

    @Column()
    remarks: string

}
