import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models';
import { getAllProduct, getItemByKey } from './services/Product';

const PORT = process.env.PORT || 3000;

// Get environment variables
dotenv.config();

// Create the express server and configure it to use json
const app = express();
app.use(express.json());

// Configure cors policy
app.use(cors());

// Set up a API call with GET method
app.get('/data', async (req: any, res: any) => {
  // Return some sample data as the response
  try {
    const channels = await getAllProduct();
    const pro = await getItemByKey('cat_id', 1);
    res.json(pro);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Start the server on port configured in .env (recommend port 8000)
app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`);
});
