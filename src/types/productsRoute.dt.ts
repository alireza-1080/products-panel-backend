import { Product } from '../generated/prisma';

type CreateProductRequestBody = {
  name: string;
  price: number;
  image: string;
};

type CreateProductResponseBody = {
  message?: string;
  product?: Product;
  error?: string;
  success?: boolean;
};

type DeleteProductRequestParams = {
  id: string;
};

type DeleteProductResponseBody = {
  message?: string;
  error?: string;
  success?: boolean;
};

export type { CreateProductRequestBody, CreateProductResponseBody, DeleteProductRequestParams, DeleteProductResponseBody };
