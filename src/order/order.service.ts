import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UserModel as UserEntity } from '../types/user.model';

/**
 * Service which interacts with the OrderRepository and handles everything order related.
 * @author (Paul Dietrich)
 * @version (24.04.2020)
 */
@Injectable()
export class OrderService {

  constructor(@InjectRepository(OrderRepository) private orderRepository: OrderRepository) {}

  /**
   * Fetches an order by it's id from the orderRepository
   * @param id - the id of the order
   */
  async getOrderById(id: string): Promise<Order> {
    return await this.orderRepository.getOrderById(id);
  }

  /**
   * Creates a new order in the orderRepository.
   * @param createOrderInput - the data about the order
   * @param user - the user who has taken the order
   */
  async createOrder(createOrderInput: CreateOrderInput, user: UserEntity) {
    return await this.orderRepository.createOrder(createOrderInput, user);
  }
}
