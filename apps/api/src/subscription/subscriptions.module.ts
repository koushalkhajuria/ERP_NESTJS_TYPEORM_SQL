import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscriptions.service';
import { SubscriptionController } from './subscriptions.controller';
import { Subscription } from './entities/subscription.entity';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory,
  ]
})
export class SubscriptionModule {}
