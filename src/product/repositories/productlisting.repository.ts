import { EntityRepository, Repository } from 'typeorm';
import { Productlisting } from '../entities/productlisting.entity';
import { Product } from '../entities/product.entity';
import { CreateListingInput } from '../dto/create-listing.input';

@EntityRepository(Productlisting)
export class ProductlistingRepository extends Repository<Productlisting> {
    /**
     * Creates a new product listing in the database.
     * @param createListingInput
     * @param productId
     * @param user - seller who makes the listing
     * @param newCondition - the condition in which the product is in
     */
    async createProductListing(createListingInput: CreateListingInput, productId: Product, newCondition, user) {
        const { price } = createListingInput;
        const productListing = new Productlisting();
        productListing.createdAt = new Date(Date.now()).toLocaleString();
        productListing.price = price;
        productListing.product = productId;
        productListing.condition = newCondition;
        productListing.userId = user.sub;
        await this.save(productListing);
        return productListing;
    }
}
