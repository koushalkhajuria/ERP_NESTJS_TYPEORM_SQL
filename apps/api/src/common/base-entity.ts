import { Entity, Column } from 'typeorm';

export class BaseEntity {
    @Column({default:1})
    createdBy: string;

    @Column({default:1})
    updatedBy: string;

    @Column({ type: "timestamp", default: () => "now()"})
    createdOn: Date;

    @Column({ type: "timestamp", default: () => "now()"})
    updatedOn: Date;
}