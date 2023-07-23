import { ApiProperty } from '@nestjs/swagger';
export class MonthDetailsDto{
    @ApiProperty({
        example:"Jan"})
    month:string

    @ApiProperty({
        example:2023})
    year:number

    @ApiProperty({
        example:1})
    userId:number
}