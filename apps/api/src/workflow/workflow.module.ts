import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaslFactory } from '../casl/casl.factory';
import { PoliciesGuard } from '../casl/policies.guard';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { WorkFlow } from './entities/workflow.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WorkFlow])],
  providers: [
    WorkflowService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PoliciesGuard,
    CaslFactory,
  ],
  controllers: [WorkflowController]
})
export class WorkflowModule {}
