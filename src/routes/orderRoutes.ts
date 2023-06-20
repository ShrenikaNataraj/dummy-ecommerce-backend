import express, { Router, Request, Response } from 'express';
import {
  getOrderDetails,
  getOrderHistory,
  createOrder,
  deleteOrder,
} from '../services/Order';

export const orderRoute = Router();

orderRoute.get('/orderHistory/:email', async (req: Request, res: Response) => {
  try {
    const emailId = req.params.email;
    const response = await getOrderHistory(emailId);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

orderRoute.get('/:orderId', async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    const response = await getOrderDetails(orderId);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

orderRoute.delete('/:orderId', async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.orderId);
    await deleteOrder(orderId);
    res.status(200).json({
      message: 'Successful',
    });
  } catch {}
});
