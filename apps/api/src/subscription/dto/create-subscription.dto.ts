import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Matches,
  MinLength,
} from 'class-validator';

/**
 * Patch Role Permission Payload Class
 */
export class CreateSubscriptionDto {
  /**
   * title field
   */
 @IsAlphanumeric()
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}