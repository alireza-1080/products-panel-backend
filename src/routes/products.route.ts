import { Router } from 'express';
import { createProduct, deleteProduct, getProducts } from '../controllers/products.controllers';

const router = Router();

router.get('/', getProducts);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

export default router;
