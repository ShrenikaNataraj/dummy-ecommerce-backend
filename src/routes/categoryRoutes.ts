import express,{ Router, Request, Response} from 'express';
import { getAllCategory } from '../services/Category';
import { CategoryOutput } from '../models/Category';

export const categoryRoute = Router();

categoryRoute.get('/category', async (req: Request, res: Response) => { 
   try {
    const allCategories:CategoryOutput[] = await getAllCategory();
    res.json(allCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});