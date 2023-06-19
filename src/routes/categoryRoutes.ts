import express,{ Router, Request, Response} from 'express';

export const categoryRoute = Router();

categoryRoute.get('/category', async (req: Request, res: Response) => {
    res.send("Hello from category")
});