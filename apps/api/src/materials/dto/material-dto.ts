import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class materialDto {

    @ApiProperty({
        example: 1
    })
    subId: number

    @ApiProperty({
        example: "unknown"
    })
    @IsNotEmpty()
    hsn: string;

    @ApiProperty({
        example: "unknown"
    })
    @IsNotEmpty()
    typeNo: string;

    @ApiProperty({
        example: "unknown"
    })
    shortDesc: string;

    @ApiProperty({
        example: "unknown"
    })
    longDesc: string;

    @ApiProperty({
        example: "unknown"
    })
    @IsNotEmpty()
    manufacturer: string;

    KeepSrNo: boolean;

    @ApiProperty({
        example: "unknown"
    })
    location: string;

    
    @ApiProperty({
        example:1})
    userId: number;

}