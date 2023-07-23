import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';
import { UserRoles } from './user-role.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSubRoles } from './user-subcription.role.entity';
import { Role } from '../roles/entities/role.entity';
import { Subscription } from '../subscription/entities/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles]),
    TypeOrmModule.forFeature([User, Role, Subscription, UserSubRoles])],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
