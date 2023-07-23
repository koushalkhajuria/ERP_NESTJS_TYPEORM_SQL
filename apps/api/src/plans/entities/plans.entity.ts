import {Column,Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn} from "typeorm"

@Entity({name:"plans"})
export class Plans{

@PrimaryGeneratedColumn()
id:number;

@Column({unique:true})
title:string

@Column({unique:true})
description:string

@Column()
price:number

@Column()
plan:string


}