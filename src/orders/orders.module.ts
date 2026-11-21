import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Payment } from './payment.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment]), AuthModule],   
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

