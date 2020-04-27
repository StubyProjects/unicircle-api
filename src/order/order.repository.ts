/**
 * Interacts with the order table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { Productlisting } from '../product/entities/productlisting.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

  /**
   * inserts a new order into the database
   * @param createOrderInput - the data of the order
   * @param user - the user which has taken the order
   */
  async createOrder(createOrderInput: CreateOrderInput, user): Promise<Order> {
    const { productListingIds} = createOrderInput;

    const productListings = [];
    let total = 0;

    //Fetches the productListings by their Ids and calculates the total price of the order.
    for (const productListing of productListingIds) {
      const listing = await getRepository(Productlisting).findOne(productListing.id);
      productListings.push(listing);
      total += listing.price;
    }

    const order = new Order();
    order.buyerId = user.sub;
    order.date = new Date(Date.now()).toLocaleString();
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
