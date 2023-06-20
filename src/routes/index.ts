import express from 'express';
import { categoryRoute } from './categoryRoutes';
import { productRoute } from './productRoutes';
import { orderRoute } from './orderRoutes';

export const routes = express.Router();

routes.use(categoryRoute);
routes.use(productRoute);
routes.use('/order', orderRoute);