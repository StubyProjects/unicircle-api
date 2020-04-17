/**
 * Interacts with the university table in the database.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
import { EntityRepository, Repository } from 'typeorm';
import { Course } from '../entities/course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {

}
