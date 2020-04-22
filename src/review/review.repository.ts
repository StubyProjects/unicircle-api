import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewInput, UpdateReviewInput } from './dto/create-review.input';

/**
 * Interacts with the review table in the database.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  /**
   * Creates a new product listing in the database.
   * @param createReviewInput
   * @param author
   */
  async createReview(createReviewInput: CreateReviewInput, author): Promise<Review> {
    const { createdAt, rating, text, title, product, userId } = createReviewInput;

    const review = new Review();

    review.createdAt = createdAt;
    review.rating = rating;
    review.title = title;
    review.text = text;
    review.authorId = author.sub;
    if(product){
      review.product = product;
    }
    else {
      review.userId = userId;
    }
    await review.save();
    return review;
  }

  async getAllReviewsById(id): Promise<Review[]> {
    return await this.find({where:[{ product: id},{ userId: id}]});
  }

  async updateReview(id, updateReviewInput: UpdateReviewInput): Promise<UpdateResult> {
    return await this.update(id, updateReviewInput);
  }

  async deleteReview(id): Promise<DeleteResult> {
    return await this.delete(id);
  }
}
