import { EntityRepository, Repository } from 'typeorm';
import { Productlisting } from '../entities/productlisting.entity';

@EntityRepository(Productlisting)
export class ProductlistingRepository extends Repository<Productlisting> {

}
