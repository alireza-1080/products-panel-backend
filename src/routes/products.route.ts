import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products.controllers';

const router = Router();

router.get('/', getProducts);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);

export default router;
