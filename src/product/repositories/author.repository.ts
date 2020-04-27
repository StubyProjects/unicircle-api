import { EntityRepository, Repository } from 'typeorm';
import { Author } from '../entities/author.entity';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {

}
