import { EntityRepository, Repository } from 'typeorm';
import { Productlisting } from '../entities/productlisting.entity';
import {CreateProductInput} from "../dto/create-product.input";
import { Product } from '../entities/product.entity';

@EntityRepository(Productlisting)
export class ProductlistingRepository extends Repository<Productlisting> {
    /**
     * Creates a new product listing in the database.
     * @param createProductInput - attributes of the product which are needed to create the listing
     * @param user - seller who makes the listing
     * @param existingProduct
     * @param newCondition - the condition in which the product is in
     */
    async createProductListing(createProductInput: CreateProductInput, existingProduct: Product, newCondition, user) {
        const { price } = createProductInput;
        const productListing = new Productlisting();
        productListing.createdAt = Date.now().toString();
        productListing.price = price;
        productListing.product = existingProduct;
        productListing.condition = newCondition;
        productListing.userId = user.sub;
        await this.save(productListing);
        return productListing;
    }
}
