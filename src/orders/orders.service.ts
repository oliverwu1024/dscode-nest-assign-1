import { Injectable, NotFoundException } from '@nestjs/common';
import {Order, Category} from './order.model'

@Injectable()
export class OrdersService {
    private orders: Order[] = [
        {
            id: "order-1",
            userId: "user-1",
            customer: "Oliver Wu",
            category: Category.Electronics,
            product: "Laptop",
            quantity: 1,
            status: "pending",           
        },
        {
            id: "order-2",
            userId: "user-2",
            customer: "Jay Z",
            category: Category.Clothing,
            product: "jacket",
            quantity: 1,
            status: "completed",           
        },
        {
            id: "order-3",
            userId: "user-3",
            customer: "Frank Uni",
            category: Category.Food,
            product: "candy",
            quantity: 1,
            status: "delivered",           
        },
    ];
    
    
    
    
    getAllOrders(): Order[] {
        return this.orders;
    }

    getOrderById(id: string): Order {
        const order = this.orders.find(order => order.id === id);
        if (!order) {
            throw new NotFoundException("cannot find this order");
        }
        return order;
    }

    getOrderByUserId(userId: string): Order[] {
        const orders = this.orders.filter(order => order.userId === userId);

        return orders;        
    }

}
