import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UniversityRepository } from './repositories/university.repository';
import { CourseRepository } from './repositories/course.repository';
import { University } from './entities/university.entity';
import { Course, GraduationType, Semester } from './entities/course.entity';
import { Reading } from './entities/reading.entity';
import { getRepository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { LectureRepository } from './repositories/lecture.repository';
import { IsPartOf } from './entities/is-part-of.entity';

/**
 * Service which connects to the database for university related operations.
 * @author (Paul Dietrich)
 * @version (17.04.2020)
 */
@Injectable()
export class UniversityService {

  constructor(@InjectRepository(UniversityRepository) private universityRepository: UniversityRepository,

              @InjectRepository(CourseRepository) private courseRepository: CourseRepository,

              @InjectRepository(LectureRepository) private lectureRepository: LectureRepository) {}

  /**
   * Returns all universities in the database
   */
  async getUniversities(): Promise<University[]> {
    return this.universityRepository.find();
  }

  /**
   * Returns all courses of one university
   * @param uniId - the id of the university
   */
  async getCoursesOfUniversity(uniId: string): Promise<Course[]> {
    return getRepository(Course).find({ where: { university: uniId}});
  }

  /**
   * Gets all products of one course of one university.
   * @param courseId - id of the course which is searched
   */
  async getCourseProductsById(courseId: string) {
    return this.courseRepository.getCourseProductsById(courseId);
  }

  /**
   * Gets all products which are read in all courses of the university
   * @param courseId - Id of the course which is searched
   * @param semester - the semester which is searched
   */
  async getSemesterProductsById(courseId: string, semester: Semester) {
    return this.courseRepository.getSemesterProductsById(courseId, semester);
  }

  async getLectureProductsById(id: string): Promise<Product[]> {
    return this.lectureRepository.getLectureProductsById(id);
  }

  /**
   * Creates a new university
   * @param name
   * @param town
   */
  async createUniversity(name: string, town: string):Promise<University> {
    return this.universityRepository.createUniversity(name, town);
  }

  /**
   * Creates a new course
   * @param name
   * @param graduation
   * @param universityId
   */
  async createCourse(name: string, graduation: GraduationType, universityId: string) {
    const university = await this.universityRepository.findOne(universityId);
    return await this.courseRepository.createCourse(name, graduation, university);
  }

  async createLecture(name: string, courseId: string) {
    let lecture = await this.lectureRepository.findOne({ where: { name: name}});
    if(lecture == undefined) {
      lecture = await this.lectureRepository.createLecture(name);
    }
    const course = await getRepository(Course).findOne(courseId);

    // Creates a new Many to Many relation between the lecture and the course.
    const isPartOf = new IsPartOf();
    isPartOf.course = course;
    isPartOf.lecture = lecture;
    await getRepository(IsPartOf).save(isPartOf);
    return lecture;
  }

  /**
   * Creates a new reading in the database.
   * @param semester - the semester in which the product of the reading is read in
   * @param productId - the product of the reading
   * @param lectureId - id of the lecture the reading belongs to
   */
  async createReading(semester: Semester, productId: string, lectureId: string): Promise<Reading> {
    const product = getRepository(Product).findOne(productId);
    const lecture = this.lectureRepository.findOne(lectureId);
    const reading = new Reading();
    reading.semester = semester;
    reading.product = await product;
    reading.lecture = await lecture;
    await reading.save();
    return reading;
  }
 }
