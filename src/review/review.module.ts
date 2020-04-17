import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewRepository]),
    HttpModule
  ],
  providers: [
    ReviewService,
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
