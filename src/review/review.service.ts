import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { CreateReviewInput, UpdateReviewInput } from './dto/create-review.input';
import { Review } from './review.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

/**
 * Service which interacts with the ReviewRepository and handles everything review related.
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
@Injectable()
export class ReviewService {

  constructor(@InjectRepository(ReviewRepository) private reviewRepository: ReviewRepository) {}

  async createReview(createReviewInput: CreateReviewInput, author): Promise<Review> {
    return await this.reviewRepository.createReview(createReviewInput, author);
  }

  async getAllReviewsById(id): Promise<Review[]> {
    return await this.reviewRepository.getAllReviewsById(id);
  }

  async updateReview(id, updateReviewInput: UpdateReviewInput): Promise<UpdateResult> {
    return await this.reviewRepository.updateReview(id, updateReviewInput);
  }

  async deleteReview(id): Promise<DeleteResult> {
    return await this.reviewRepository.deleteReview(id);
  }
}
