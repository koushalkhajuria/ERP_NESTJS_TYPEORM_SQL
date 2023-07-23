import { Plans } from './entities/plans.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Plans])],
  providers: [PlansService],
  controllers: [PlansController]
})
export class PlansModule {}
