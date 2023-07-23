import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
export class cusDto{
    @ApiProperty({example:1})
    subId:number;

    @ApiProperty({example:"nexgen"})
    @IsNotEmpty()
    companyName: string;

    @ApiProperty({example:"unknown"})
    @IsNotEmpty()
    addressL1: string;

    @ApiProperty({example:"unknown"})
    addressL2: string;

    @ApiProperty({example:0})
    @IsNotEmpty()
    @IsInt()
    pinCode: number;

    @ApiProperty({example:"unknown"})
    @IsNotEmpty()
    state: string;

    @ApiProperty({example:"unknown"})
    cin:string;

    @ApiProperty({example:"unknown"})
    @IsNotEmpty()
    gstin: string;

    @ApiProperty({example:"unknown"})
    @IsNotEmpty()
    pancard: string;

    @ApiProperty({example:1})
    @IsNotEmpty()
    userId:number;
    }