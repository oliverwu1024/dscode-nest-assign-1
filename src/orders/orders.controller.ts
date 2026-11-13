import { Controller, Get, Param} from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Order } from './order.model';



@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Get()
    getOrders(): Order[] {
        return this.orderService.getAllOrders();
    }
    @Get(':id')
    getOrderById(@Param('id') id: string): Order {
        return this.orderService.getOrderById(id);
    }

    @Get('user/:userId') 
    getOrderByUserId(@Param('userId')userId: string): Order[] {
        return this.orderService.getOrderByUserId(userId); 
    }

}
