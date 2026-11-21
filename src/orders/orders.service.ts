import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('cannot find this order');
    }
    return order;
  }

  getOrderByUserId(userId: string): Promise<Order[]> {
    return this.ordersRepository.findBy({ userId });
  }
}