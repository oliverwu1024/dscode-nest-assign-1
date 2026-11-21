import { Controller, Get, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Order } from './order.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCookieAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//@ApiBearerAuth()
@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@ApiCookieAuth('token')
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Get()
    @ApiOperation({summary:'get all orders'})
    @ApiResponse({ status: 200, description: 'list of all orders' })
    @ApiResponse({ status: 401, description: 'not logged in' })
    /*
    @ApiResponse({status, description})
    */
    getOrders(): Promise<Order[]> {
        return this.orderService.getAllOrders();
    }
    @Get(':id')
    @ApiOperation({summary:'get orders by order id'})
    @ApiResponse({ status: 200, description: 'found the order' })
    @ApiResponse({ status: 400, description: 'id is not in the correct uuid format' })
    @ApiResponse({ status: 401, description: 'not logged in' })
    @ApiResponse({ status: 404, description: 'cannot find the order' })
    getOrderById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
        return this.orderService.getOrderById(id);
    }

    @Get('user/:userId') 
    @ApiOperation({summary:'get all orders under certain user id'})
    @ApiResponse({ status: 200, description: 'orders of this user (empty array if none)' })
    @ApiResponse({ status: 400, description: 'user id is not in the correct uuid format' })
    @ApiResponse({ status: 401, description: 'not logged in' })
    getOrderByUserId(@Param('userId', ParseUUIDPipe)userId: string): Promise<Order[]> {
        return this.orderService.getOrderByUserId(userId); 
    }

}
