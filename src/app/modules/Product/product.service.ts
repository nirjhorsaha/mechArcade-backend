/* eslint-disable prefer-const */
import QueryBuilder from '../../builder/QueryBuilder';
import { Product } from './product..model';
import { ProductSearchableFields } from './product.constant';
import { IProduct } from './product.interface';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const product = await Product.create(payload);
  return product;
};

// const getAllProducts = async (): Promise<IProduct[]> => {
//   return await Product.find({ isDeleted: false });
// };

const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query,
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findOne({ _id: id, isDeleted: false });
};

const updateProduct = async (
  id: string,
  data: Partial<IProduct>,
): Promise<IProduct | null> => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  return product;
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
