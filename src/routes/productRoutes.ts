import express,{ Router, Request, Response} from 'express';
import { listProducts } from '../services/Product'
import { IRequestQueryParams } from '../types';

export const productRoute = Router();

productRoute.get('/products', async (req:Request<{}, {}, {}, IRequestQueryParams>, res:Response) => {
    await listProducts(req,res);
})