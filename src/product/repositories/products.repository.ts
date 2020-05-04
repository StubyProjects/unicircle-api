import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { PartialProductFilter } from '../dto/get-products-filter.dto';
import { CreateProductInput } from '../dto/create-product.input';
import { Category } from '../entities/category.entity';
import { Author } from '../entities/author.entity';
import { Productlisting } from '../entities/productlisting.entity';

export class CompleteProduct {
  details: any;
  categories: Array<Category>;
  authors: Array<Author>;
}

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {

  /**
   * Creates a new product in the product table. This only happens if the specified product isn't in the database already.
   * @param createProductInput - the attributes which are needed to create the product.
   */
  async createEntity(createProductInput: CreateProductInput) {
    const {
      title, subtitle, isbn10, isbn13, description, listPrice,
      imageUrl, publisher,
    } = createProductInput;

    const product = new Product();
    product.title = title;
    product.subtitle = subtitle;
    product.isbn10 = isbn10;
    product.isbn13 = isbn13;
    product.description = description;
    product.listPrice = listPrice;
    product.imageUrl = imageUrl;
    product.publisher = publisher;

    await this.save(product);

    return product;
  }

  // Returns one book by its id.
  async findOneById(id) {
    const details = await this.findOne(id);
    const categories = await ProductsRepository.getCategories(id);
    const authors = await ProductsRepository.getAuthors(id);
    const listings = await ProductsRepository.getListings(id);

    return {
      details,
      categories,
      authors,
      listings
    };
  }

  // Returns all products with a pagination of 15.
  async getAllProducts(page): Promise<any[]> {
    const simpleProducts = await this.find({ take: 15, skip: 15 * (page - 1) });
    return this.completeProducts(simpleProducts);
  }

  // Returns all categories the product is included in.
  private static async getCategories(id) {
    return await getRepository(Category)
      .createQueryBuilder('category')
      .innerJoin('category.inclusions', 'isIncluded')
      .where('isIncluded.product.id = :id', { id: id })
      .getMany();
  }

  // Returns all authors of the product.
  private static async getAuthors(id) {
    return await getRepository(Author)
      .createQueryBuilder('author')
      .innerJoin('author.writings', 'writing')
      .where('writing.product.id = :id', { id: id })
      .getMany();
  }

  private static async getListings(id) {
    return await getRepository(Productlisting)
      .createQueryBuilder('listing')
      .where('listing.product.id = :id', { id: id })
      .getMany();
  }

  /*
   * Filter for the products
   */
  async getProductsWithFilters(filterDto: PartialProductFilter) {
    const { university, course, lecture, semester } = filterDto;
    let query = await this.createQueryBuilder('product')
      .innerJoin('product.readings', 'reading')
      .innerJoin('reading.lecture', 'lecture')
      .innerJoin('lecture.isPartOf', 'isPartOf')
      .innerJoin('isPartOf.course', 'course')
      .innerJoin('course.university', 'university');
    if (university !== undefined) {
      query = query.where('university.name = :universityName', { universityName: university });
    }
    if (course !== undefined) {
      query = query.andWhere('course.name = :courseName', { courseName: course });
    }
    if (lecture !== undefined) {
      query = query.andWhere('lecture.name = :lectureName', { lectureName: lecture });
    }
    if (semester !== undefined) {
      query = query.andWhere('reading.semester = :semester', { semester: semester });
    }
    const simpleProducts = await query.getMany();

    return await this.completeProducts(simpleProducts);
  }

  /**
   * Adds authors and categories to the product when it's send to the frontend.
   * @param simpleProducts - the product array without authors and categories.
   */
  async completeProducts(simpleProducts: Array<Product>) {
    const completeProducts = [];
    for (const details of simpleProducts) {
      const categories = await ProductsRepository.getCategories(details.id);
      const authors = await ProductsRepository.getAuthors(details.id);

      const completeProduct: CompleteProduct = {
        details,
        categories,
        authors,
      };
      completeProducts.push(completeProduct);
    }
    return completeProducts;
  }

  /**
   * FULL TEXT SEARCH on the database for products
   * @param searchTerm
   */
  async findBySearch(searchTerm) {

    return await this.createQueryBuilder('product')
      //.innerJoin("product.writtenBy", "writtenBy")
      //.innerJoin("writtenBy.author", "author")
      //.innerJoin("product.inclusions", "inclusion")
      //.innerJoin("inclusion.category", "category")
      //.innerJoin("product.readings", "reading")
      //.innerJoin("reading.lecture", "lecture")
      //.innerJoin("lecture.isPartOf", "isPartOf")
      //.innerJoin("isPartOf.course", "course")
      //.innerJoin("course.university", "university")
      .where('product.title LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      .orWhere('product.subtitle LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      .orWhere('product.isbn10 LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      .orWhere('product.isbn13 LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      .orWhere('product.description LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      //.orWhere('author.name LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      //.orWhere('category.title LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      //.orWhere('lecture.name LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      //.orWhere('course.name LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      //.orWhere('university.name LIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
      .getMany()
  }

}
