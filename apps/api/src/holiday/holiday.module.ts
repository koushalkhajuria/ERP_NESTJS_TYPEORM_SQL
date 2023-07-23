import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';
import { HolidayController } from './holiday.controller';
import { HolidayService } from './holiday.service';
import { Holiday } from './holiday_entity';

@Module({
    imports:[TypeOrmModule.forFeature([Holiday])],
  providers: [
    HolidayService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory,
  ],
  controllers: [HolidayController]
})
export class HolidayModule {

}
