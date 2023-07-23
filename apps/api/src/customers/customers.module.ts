import { Customers } from './entities/customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports:[TypeOrmModule.forFeature([Customers])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
