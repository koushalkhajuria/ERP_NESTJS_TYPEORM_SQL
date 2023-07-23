import { ApiProperty } from '@nestjs/swagger';
export class UpdateMonDetailsDto {
    @ApiProperty({
        example:1})
    id:number

    @ApiProperty()
    customer1: string

    @ApiProperty()
    customer2: string

    @ApiProperty()
    SR: number

    @ApiProperty()
    remarks: string
}