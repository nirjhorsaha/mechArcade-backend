/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Product } from './product..model';
import { ProductSearchableFields } from './product.constant';
import { CloudinaryResponse, IProduct } from './product.interface';

const createProduct = async (
  payload: IProduct,
  file: any,
): Promise<IProduct> => {
  const imageName = `${payload.brand}_${payload?.name}`;
  const path = file?.path;
  //send image to cloudinary
  const { secure_url }: CloudinaryResponse = await sendImageToCloudinary(imageName, path);

  payload.imageUrl = secure_url;

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
