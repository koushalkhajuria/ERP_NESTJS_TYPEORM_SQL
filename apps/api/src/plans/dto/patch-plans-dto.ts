import { ApiProperty } from '@nestjs/swagger';
export class patchPlanDto{

    @ApiProperty()
    title:string

    @ApiProperty()
    description:string

    @ApiProperty()
    price:number

    @ApiProperty()
    plan:string   
}