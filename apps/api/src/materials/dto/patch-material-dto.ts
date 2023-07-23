import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class updateMatDto {

    @ApiProperty({
        example: 1
    })
    subId: number

    @ApiProperty({
        example: "unknown"
    })
  
    hsn: string;

    @ApiProperty({
        example: "unknown"
    })
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
    manufacturer: string;

    @ApiProperty({
        example: "false"
    })
    KeepSrNo: boolean;

    @ApiProperty({
        example: "unknown"
    })
    location: string;

    
    @ApiProperty({
        example:1})
    userId: number;

}