import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities/permission.entity';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';
import { AuthenService } from '../casl/authen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory
  ],
  exports: [PermissionsService]
})
export class PermissionsModule {}
