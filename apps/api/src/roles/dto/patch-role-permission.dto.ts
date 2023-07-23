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
export class PatchRolePermissionDto {
  /**
   * roleId field
   */
  @ApiProperty()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty()
  @IsNotEmpty()
  permissionId: number;
}
