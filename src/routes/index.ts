import express from 'express';
import { categoryRoute } from './categoryRoutes';
import { productRoute } from './productRoutes';

export const routes = express.Router();

routes.use(categoryRoute)
routes.use(productRoute)