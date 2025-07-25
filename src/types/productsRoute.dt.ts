import { Product } from '../generated/prisma';

type GetProductsResponseBody = {
  message?: string;
  products?: Product[];
  error?: string;
  success?: boolean;
};

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

type UpdateProductRequestParams = {
  id: string;
};

type UpdateProductRequestBody = {
  name?: string;
  price?: number;
  image?: string;
};

type UpdateProductResponseBody = {
  message?: string;
  product?: Product;
  error?: string;
  success?: boolean;
};

export type {
  CreateProductRequestBody,
  CreateProductResponseBody,
  DeleteProductRequestParams,
  DeleteProductResponseBody,
  GetProductsResponseBody,
  UpdateProductRequestBody,
  UpdateProductRequestParams,
  UpdateProductResponseBody,
};
