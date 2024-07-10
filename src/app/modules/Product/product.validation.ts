import { z } from 'zod';

const CreateProductvalidtionSchema = z.object({
  body: z.object({
    name: z.string().max(50, { message: 'Name must not exceed 50 characters' }),
    brand: z
      .string()
      .max(50, { message: 'Brand name must not exceed 50 characters' }),
    price: z.string().min(0, { message: 'Price must be a positive number' }),
    quantity: z
      .number()
      .min(0, { message: 'Quantity must be a positive number' }),
    rating: z
      .number()
      .min(0, { message: 'Rating must be a number between 0 and 5' })
      .max(5, { message: 'Rating must be a number between 0 and 5' }),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' }),
    imageUrl: z.string().url({ message: 'Image URL must be a valid URL' }),
    isDeleted: z.boolean(),
    inStock: z.boolean(),
  }),
});

const UpdateProductvalidtionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .max(50, { message: 'Name must not exceed 50 characters' })
      .optional(),
    brand: z
      .string()
      .max(50, { message: 'Brand name must not exceed 50 characters' })
      .optional(),
    price: z
      .string()
      .min(0, { message: 'Price must be a positive number' })
      .optional(),
    quantity: z
      .number()
      .min(0, { message: 'Quantity must be a positive number' })
      .optional(),
    rating: z
      .number()
      .min(0, { message: 'Rating must be a number between 0 and 5' })
      .max(5, { message: 'Rating must be a number between 0 and 5' })
      .optional(),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .optional(),
    imageUrl: z
      .string()
      .url({ message: 'Image URL must be a valid URL' })
      .optional(),
    isDeleted: z.boolean().optional(),
    inStock: z.boolean().optional(),
  }),
});

export const ProductValdation = {
  CreateProductvalidtionSchema,
  UpdateProductvalidtionSchema,
};
