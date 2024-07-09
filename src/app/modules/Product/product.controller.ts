import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import noDataFound from '../../middlewares/noDataFound';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const product = await ProductService.cretaProduct(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product created successfully',
    data: product,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const product = await ProductService.getAllProducts();

  if (product.length === 0) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: product,
  });
});

const getProductByID = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const product = await ProductService.getSingleProducts(productId);

  if (!product) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product retrieved successfully',
    data: product,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const updatedCourseData = req.body;

  const existingProduct = await ProductService.getSingleProducts(productId);
  if (!existingProduct) {
    return noDataFound(res);
  }

  const updateProduct = await ProductService.updateProduct(
    productId,
    updatedCourseData,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product updated successfully',
    data: updateProduct,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const existingProduct = await ProductService.getSingleProducts(productId);;

  if (!existingProduct) {
    return noDataFound(res);
  }

  const deleteProduct = await ProductService.deleteProduct(productId);
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: deleteProduct,
  });
});

export const ProductController = {
    createProduct,
    getAllProducts,
    getProductByID,
    updateProduct,
    deleteProduct
};
