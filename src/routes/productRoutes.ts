import express,{ Router, Request, Response} from 'express';
import { listProducts } from '../services/Product'

export const productRoute = Router();

productRoute.get('/products', async (req, res) => {
    await listProducts(req,res);
})