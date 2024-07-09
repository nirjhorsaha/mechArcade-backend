import { Product } from './product..model';
import { IProduct } from './product.interface';

const cretaProduct = async (payload: IProduct): Promise<IProduct> => {
  const product = await Product.create(payload);
  return product;
};

const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ isDeleted: false });
};

const getSingleProducts = async (id: string): Promise<IProduct | null> => {
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
  cretaProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct,
};
