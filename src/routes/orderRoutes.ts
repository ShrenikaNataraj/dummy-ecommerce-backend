import { Router, Request, Response } from 'express';
import {
  getOrderDetails,
  getOrderHistory,
  createOrder,
  deleteOrder,
} from '../services/Order';

export const orderRoute = Router();

orderRoute.post('/', async (req: Request, res: Response) => {
  try {
    const response = await createOrder(req.body);
    res.json({
      oId: response,
      message: 'Successfully Created!!',
    });
  } catch (err) {
    res.status(err.statusCode).send(err.message);
  }
});

orderRoute.get('/orderHistory/:email', async (req: Request, res: Response) => {
  try {
    const emailId = req.params.email;
    const response = await getOrderHistory(emailId);
    res.json(response);
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
});

orderRoute.get('/:orderId', async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    const response = await getOrderDetails(orderId);
    res.json(response);
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
});

orderRoute.delete('/:orderId', async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    await deleteOrder(orderId);
    res.status(200).json({
      orderId,
      message: 'Successfully Deleted!!',
    });
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
});
