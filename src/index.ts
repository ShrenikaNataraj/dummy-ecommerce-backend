import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models';
import { routes } from './routes';
import { getItemByKey } from './services/Product';

const PORT = process.env.PORT || 3000;

// Get environment variables
dotenv.config();

// Create the express server and configure it to use json
const app = express();
app.use(express.json());

// Configure cors policy
app.use(cors());

app.use('/', routes);

// Start the server on port configured in .env (recommend port 8000)
app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`);
});
