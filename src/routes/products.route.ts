import { Router } from 'express';
import { createProduct } from '../controllers/products.controllers';

const router = Router();

router.post('/', createProduct);

export default router;
