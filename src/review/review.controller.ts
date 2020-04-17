import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewInput, UpdateReviewInput } from './dto/create-review.input';
import { User } from '../custom-decorators/user.decorator';
import { UserModel as UserEntity } from '../types/user.model';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';

/**
 * Controller for everything related to reviews. Connection to the frontend.
 * Can be called by http://localhost:8000/review
 * @author (Paul Dietrich)
 * @version (16.04.2020)
 */
@Controller('review')
export class ReviewController {

  constructor(private reviewService: ReviewService) {}

  /**
   * Method to create a new review.
   * @param createReviewInput - dto which includes rating, text of the review and who it belongs to (a product or a seller).
   * @param author - the user who wrote the review
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReview(
    @Body() createReviewInput: CreateReviewInput,
    @User() author: UserEntity
  ) {
    return await this.reviewService.createReview(createReviewInput,author)
  }

  /**
   * Gets all reviews of a product or a seller by its id.
   * @param id - the id of a product or a seller.
   */
  @Get('/:id')
  async getAllReviewsById(@Param('id') id: string) {
    return await this.reviewService.getAllReviewsById(id);
  }

  /**
   * Updates a review by it's id. The updated fields are a subset of the createReviewInput dto.
   * @param id - the id of the review
   * @param updateReviewInput - the fields which should be updated
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/:id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewInput: UpdateReviewInput): Promise<UpdateResult> {
    return await this.reviewService.updateReview(id, updateReviewInput);
  }

  /**
   * Deletes a review by it's id. Also gets called if the seller or the product gets deleted to which
   * the review belongs to.
   * @param id - the id of the review
   *
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteReview(@Param('id') id:string): Promise<DeleteResult>{
    return await this.reviewService.deleteReview(id);
  }
}
