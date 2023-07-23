import { WorkFlow } from './../workflow/entities/workflow.entity';


import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';

import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Month } from './entities/attendance.entity';
import { MonthDetails } from './entities/month_details_entity';


@Module({
    
  imports:[TypeOrmModule.forFeature([Month,MonthDetails,WorkFlow])],
    providers: [
      AttendanceService,
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
      PoliciesGuard,
      CaslFactory,
    ],
  controllers: [AttendanceController]
})
export class AttendanceModule {}