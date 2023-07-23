import { Materials } from './entities/materials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';

@Module({
  imports:[TypeOrmModule.forFeature([Materials])],
  controllers: [MaterialsController],
  providers: [MaterialsService]
})
export class MaterialsModule {}
