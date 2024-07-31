/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // * Adds a search condition to the query based on the provided searchable fields.
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // * Filters the query by excluding specific fields and applying the remaining query object.
  filter() {
    const queryObj = { ...this.query }; // Copy query object

    // Filtering
    const excludeFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'minPrice',
      'maxPrice',
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  filterByPrice() {
    const minPrice = Number(this.query.minPrice) || 0;
    const maxPrice = Number(this.query.maxPrice) || Infinity;
    this.modelQuery = this.modelQuery.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    return this;
  }

  // * Sorts the query results based on the provided sort string.
  sort() {
    const sortField = (this?.query?.sort as string) || 'brand'; // Default sort field is 'price'

    const isDescending = sortField.startsWith('-'); // If the sorting is descending

    const field = isDescending ? sortField.substring(1) : sortField; // Remove the '-' if present to get the field name
    this.modelQuery = this.modelQuery.sort({ [field]: isDescending ? 1 : -1 });
    return this;
  }

  // * Paginates the query results based on the provided page and limit.
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // * Selects specific fields to be returned in the query results.
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  // * Calculates the total number of documents and the total number of pages.
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;

// import { Document, FilterQuery } from 'mongoose';

// type QueryParams = {
//   search?: string;
//   filter?: Record<string, any>;
//   sort?: string;
//   page?: number;
//   limit?: number;
//   fields?: string;
// };

// class QueryBuilder<T extends Document> {
//   private modelQuery: any;
//   private params: QueryParams;

//   constructor(query: any, params: QueryParams) {
//     this.modelQuery = query;
//     this.params = params;
//   }

//   // Handle search
//   search(searchableFields: string[]): this {
//     const searchTerm = this.params.search;
//     if (searchTerm) {
//       const searchQuery = {
//         $or: searchableFields.map((field) => ({
//           [field]: { $regex: searchTerm, $options: 'i' },
//         })) as FilterQuery<T>[],
//       };

//       this.modelQuery = this.modelQuery.find(searchQuery);
//     }
//     return this;
//   }

//   // Handle filtering
//   filter(): this {
//     if (this.params.filter) {
//       this.modelQuery = this.modelQuery.where(this.params.filter);
//     }
//     return this;
//   }

//   // Handle sorting
//   sort(): this {
//     if (this.params.sort) {
//       const isDescending = this.params.sort.startsWith('-');
//       const field = isDescending ? this.params.sort.substring(1) : this.params.sort;
//       this.modelQuery = this.modelQuery.sort({ [field]: isDescending ? -1 : 1 });
//     }
//     return this;
//   }

//   // Handle pagination
//   paginate(): this {
//     const page = this.params.page || 1;
//     const limit = this.params.limit || 10;
//     const skip = (page - 1) * limit;
//     this.modelQuery = this.modelQuery.skip(skip).limit(limit);
//     return this;
//   }

//   // Handle field selection
//   fields(): this {
//     if (this.params.fields) {
//       this.modelQuery = this.modelQuery.select(this.params.fields.split(',').join(' '));
//     }
//     return this;
//   }

//   // Execute the query
//   get modelQueryResult(): Promise<T[]> {
//     return this.modelQuery.exec();
//   }

//   // Get the total count of documents
//   async countTotal(): Promise<number> {
//     return this.modelQuery.model.countDocuments(this.modelQuery.getFilter()).exec();
//   }
// }

// export default QueryBuilder;
