import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/db.services';
import {
  CreateProductRequestBody,
  CreateProductResponseBody,
  DeleteProductRequestParams,
  DeleteProductResponseBody,
  GetProductsResponseBody,
  UpdateProductRequestBody,
  UpdateProductRequestParams,
  UpdateProductResponseBody,
} from '../types/productsRoute.dt';
import { isValidObjectId } from '../utils/isValidObjectId';
import { PrismaError } from '../types/errors';

const getProducts = async (req: Request, res: Response<GetProductsResponseBody>, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      message: 'Products fetched successfully',
      products,
      success: true,
    });
  } catch (error: unknown) {
    const prismaError = error as PrismaError;
    // Handle Prisma errors
    if (prismaError.code === 'P2003') {
      return res.status(400).json({
        error: 'Database constraint violation',
        success: false,
      });
    }

    if (prismaError.code === 'P2014') {
      return res.status(400).json({
        error: 'Invalid database connection',
        success: false,
      });
    }

    if (prismaError.code === 'P2024') {
      return res.status(500).json({
        error: 'Database timeout',
        success: false,
      });
    }

    // Log the error for debugging
    //eslint-disable-next-line no-console
    console.error('Products fetch error:', prismaError);

    // Pass to global error handler
    next(prismaError);
  }
};

const createProduct = async (
  req: Request<object, object, CreateProductRequestBody>,
  res: Response<CreateProductResponseBody>,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: 'name, image, and price are required',
        success: false,
      });
    }

    const { name, image, price } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
        success: false,
      });
    }

    if (!image) {
      return res.status(400).json({
        error: 'Image is required',
        success: false,
      });
    }

    if (!price || typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        error: 'Valid price is required (must be a positive number)',
        success: false,
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        image,
        price,
      },
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
      success: true,
    });
  } catch (error: unknown) {
    const prismaError = error as PrismaError;
    // Handle Prisma errors
    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        error: 'Product with this name already exists',
        success: false,
      });
    }

    if (prismaError.code === 'P2003') {
      return res.status(400).json({
        error: 'Invalid data provided',
        success: false,
      });
    }

    // Log the error for debugging
    //eslint-disable-next-line no-console
    console.error('Product creation error:', prismaError);

    // Pass to global error handler
    next(prismaError);
  }
};

const deleteProduct = async (
  req: Request<DeleteProductRequestParams>,
  res: Response<DeleteProductResponseBody>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // check if the id is a valid mongodb object id
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: 'Invalid product ID',
        success: false,
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
    });
  } catch (error: unknown) {
    const prismaError = error as PrismaError;
    // Handle Prisma errors
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        error: 'Product not found',
        success: false,
      });
    }

    if (prismaError.code === 'P2003') {
      return res.status(400).json({
        error: 'Cannot delete product due to existing references',
        success: false,
      });
    }

    // Log the error for debugging
    //eslint-disable-next-line no-console
    console.error('Product deletion error:', prismaError);

    // Pass to global error handler
    next(prismaError);
  }
};

const updateProduct = async (
  req: Request<UpdateProductRequestParams, object, UpdateProductRequestBody>,
  res: Response<UpdateProductResponseBody>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // check if the id is a valid mongodb object id
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: 'Invalid product ID',
        success: false,
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        success: false,
      });
    }

    if (!req.body) {
      return res.status(400).json({
        error: 'at least one of name, image, or price is required',
        success: false,
      });
    }

    const { name: newName, price: newPrice, image: newImage } = req.body;

    // validation
    if (newName) {
      if (typeof newName !== 'string') {
        return res.status(400).json({
          error: 'Name must be a string',
          success: false,
        });
      }
    }
    if (newPrice) {
      if (typeof newPrice !== 'number' || newPrice <= 0) {
        return res.status(400).json({
          error: 'Price must be a positive number',
          success: false,
        });
      }
    }

    if (newImage) {
      if (typeof newImage !== 'string') {
        return res.status(400).json({
          error: 'Image must be a string',
          success: false,
        });
      }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: newName || product.name,
        price: newPrice || product.price,
        image: newImage || product.image,
      },
    });

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
      success: true,
    });
  } catch (error: unknown) {
    const prismaError = error as PrismaError;
    // Handle Prisma errors
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        error: 'Product not found',
        success: false,
      });
    }

    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        error: 'Product with this name already exists',
        success: false,
      });
    }

    if (prismaError.code === 'P2003') {
      return res.status(400).json({
        error: 'Invalid data provided for update',
        success: false,
      });
    }

    if (prismaError.code === 'P2014') {
      return res.status(400).json({
        error: 'Invalid database connection',
        success: false,
      });
    }

    // Log the error for debugging
    //eslint-disable-next-line no-console
    console.error('Product update error:', prismaError);

    // Pass to global error handler
    next(prismaError);
  }
};

export { createProduct, deleteProduct, getProducts, updateProduct };
