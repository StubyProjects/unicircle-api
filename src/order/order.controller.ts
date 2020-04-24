import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderInput } from './dto/create-order.input';
import { User } from '../custom-decorators/user.decorator';
import { UserModel as UserEntity } from '../types/user.model';

/**
 * Controller for everything related to orders. Connection to the frontend.
 * Can be called by http://localhost:8000/order
 * @author (Paul Dietrich)
 * @version (24.04.2020)
 */
@Controller('order')
export class OrderController {

  constructor(private orderService: OrderService) {
  }

  /**
   * returns a order from the database by it's id.
   * @param id - see above
   */
  @Get('/:id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return await this.orderService.getOrderById(id);
  }

  /**
   * Creates a new order in the database. User has to be authenticated ( Logged in with auth0 )
   * to do this operation.
   * @param createOrderInput - the data about the order ( products, total price etc.)
   * @param user - the user which has taken the order.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrder(
    @Body() createOrderInput: CreateOrderInput,
    @User() user: UserEntity): Promise<Order> {
    return this.orderService.createOrder(createOrderInput, user);

  }

}
