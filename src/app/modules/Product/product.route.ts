import express, { NextFunction, Request, Response } from 'express';
import { ProductController } from './product.controller';
import { ProductValdation } from './product.validation';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValdation.CreateProductvalidtionSchema),
  ProductController.createProduct,
);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductByID);

router.patch(
  '/:id',
  validateRequest(ProductValdation.UpdateProductvalidtionSchema),
  ProductController.updateProduct,
);

router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;
