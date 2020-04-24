/**
 * Interacts with the order table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create-order.input';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

  /**
   * inserts a new order into the database
   * @param createOrderInput - the data of the order
   * @param user - the user which has taken the order
   */
  async createOrder(createOrderInput: CreateOrderInput, user) {
    const { date, total, productListings} = createOrderInput;

    const order = new Order();
    order.buyerId = user.sub;
    order.date = date;
    order.total = total;
    order.productListings = productListings;
    await order.save();
    return order;
  }

  /**
   * Retrieves a order from the database by it's id.
   * @param id - the id of the order
   */
  async getOrderById(id): Promise<Order> {
    return await this.findOne(id);
  }
}
