import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class updateUserRoleDto{
  
  @ApiProperty({required:true, example: "admin"})
  @IsNotEmpty()
  role: string;
}