import { Router } from 'express';
import productsRouter from './products.route';

const router = Router();

router.use('/products', productsRouter);

export default router;
