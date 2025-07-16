import { Router } from 'express';
import { createProduct, deleteProduct } from '../controllers/products.controllers';

const router = Router();

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

export default router;
