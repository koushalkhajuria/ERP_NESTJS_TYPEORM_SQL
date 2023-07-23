import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

/**
 * Patch Role Permission Payload Class
 */
export class PatchUserSubRoleDto {
  /**
   * userId field
   */
  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  /**
   * subId field : subscription id
   */
  @ApiProperty()
  @IsNotEmpty()
  subId: number;

  /**
   * Role field
   */
  @ApiProperty()
  @IsNotEmpty()
  roleId: number;
}
