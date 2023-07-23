import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';
import { PoController } from '../po/po.controller';
import { So } from './entities/so.entity';
import { APP_GUARD } from '@nestjs/core';
import { SoDetails } from './entities/sodetails.entity';
import { SoService } from './so.service';
import { SoController } from './so.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([So,SoDetails ]),
   ],
  providers: [
    SoService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory,
  ],
  controllers: [SoController]
})
export class SoModule {}
