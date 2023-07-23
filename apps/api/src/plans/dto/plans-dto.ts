import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
export class planDto{

    @ApiProperty()
    @IsNotEmpty()
    title:string

    @ApiProperty()
    description:string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    price:number

    @ApiProperty()
    @IsNotEmpty()
    plan:string   
}

