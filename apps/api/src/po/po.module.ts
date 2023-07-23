import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';
import { PoController } from './po.controller';
import { Po } from './entities/po.entity';
import { PoService } from './po.service';
import { PoDetails } from './entities/podetails.entity';
import { Materials } from '../materials/entities/materials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Po,PoDetails,Materials]),
   ],
  providers: [
    PoService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory,
  ],
  controllers: [PoController],
})
export class PoModule {}
