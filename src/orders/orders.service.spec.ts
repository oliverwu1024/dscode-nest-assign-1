import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import request from 'supertest';

describe('OrdersService', () => {
  let service: OrdersService;

  // Fake repository: every method is a jest.fn() (a fake function)
  const mockOrdersRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    findBy: jest.fn(),
  };

  // Fake data
  const fakeOrder = { id: 'order-1', userId: 'user-1', orderNumber: 'ORD-001' };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Order), useValue: mockOrdersRepository },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('getOrderById', () => {
    it('should return the order when it exists', async () => {
      mockOrdersRepository.findOneBy.mockResolvedValue(fakeOrder);

      const result = await service.getOrderById('order-1');

      expect(result).toEqual(fakeOrder);
    });

    it('should throw NotFoundException when the order does not exist', async () => {
      mockOrdersRepository.findOneBy.mockResolvedValue(null);

      await expect(service.getOrderById('not-exist')).rejects.toThrow(NotFoundException);
    });

    it('should query the database with the given id', async () => {
      mockOrdersRepository.findOneBy.mockResolvedValue(fakeOrder);

      await service.getOrderById('order-1');

      expect(mockOrdersRepository.findOneBy).toHaveBeenCalledWith({ id: 'order-1' });
    });
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      mockOrdersRepository.find.mockResolvedValue([fakeOrder]);   
      const result = await service.getAllOrders();                
      expect(result).toEqual([fakeOrder]);                        
    });
    it('should return an empty array when there are no orders', async () => {
      mockOrdersRepository.find.mockResolvedValue([]);
      const result = await service.getAllOrders();
      expect(result).toEqual([]);
    });
  });
  describe('getOrderByUserId', () => {
    it('should return the orders of the user', async () => {
      mockOrdersRepository.findBy.mockResolvedValue([fakeOrder]);
      const result = await service.getOrderByUserId(fakeOrder.userId);
      expect(result).toEqual([fakeOrder])
    });

    it('should return an empty array when the user has no orders', async () => {
      mockOrdersRepository.findBy.mockResolvedValue([]);
      const result = await service.getOrderByUserId('dsaddsa');
      expect(result).toEqual([])
    });
  });

});