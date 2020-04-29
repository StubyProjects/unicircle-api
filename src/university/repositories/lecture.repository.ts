import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Lecture } from '../entities/lecture.entity';
import { Product } from '../../product/entities/product.entity';

@EntityRepository(Lecture)
export class LectureRepository extends Repository<Lecture> {

  async createLecture(name: string): Promise<Lecture> {
    const lecture = new Lecture();
    lecture.name = name;
    await this.save(lecture);
    return lecture;
  }

  async getLectureProductsById(id: string): Promise<Product[]> {
    return getRepository(Product)
      .createQueryBuilder("product")
      .innerJoin("product.readings", "reading")
      .where("reading.lecture.id = :lectureId", { lectureId: id })
      .getMany();
  }
}
