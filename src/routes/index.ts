import express from 'express';
import { categoryRoute } from './categoryRoutes';

export const routes = express.Router();

routes.use(categoryRoute)