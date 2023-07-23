import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
export class patchCusDto{
    @ApiProperty({
        example:1})
    subId:number;

    @ApiProperty({
        example:"nexgen"})
    companyName: string;

    @ApiProperty({
        example:"unknown"})
    addressL1: string;

    @ApiProperty({
        example:"unknown"})
    addressL2: string;

    @ApiProperty({
        example:0})
    pinCode: number;

    @ApiProperty({
        example:"unknown"})
    state: string;

    @ApiProperty({
        example:"unknown"})

    cin:string;

    @ApiProperty({
        example:"unknown"})
    gstin: string;
    

    @ApiProperty({
        example:"unknown"})
    pancard: string;

        @ApiProperty({
        example:1})
    userId:number
    }