import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/db.services';
import {
  CreateProductRequestBody,
  CreateProductResponseBody,
  DeleteProductRequestParams,
  DeleteProductResponseBody,
} from '../types/productsRoute.dt';
import { isValidObjectId } from '../utils/isValidObjectId';

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
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Product with this name already exists',
        success: false,
      });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({
        error: 'Invalid data provided',
        success: false,
      });
    }

    // Log the error for debugging
    console.error('Product creation error:', error);

    // Pass to global error handler
    next(error);
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

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
    });
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Product not found',
        success: false,
      });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({
        error: 'Cannot delete product due to existing references',
        success: false,
      });
    }

    // Log the error for debugging
    console.error('Product deletion error:', error);

    // Pass to global error handler
    next(error);
  }
};

export { createProduct, deleteProduct };
