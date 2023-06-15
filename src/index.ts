import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;

// Get environment variables
dotenv.config();

// Create the express server and configure it to use json
const app = express();
app.use(express.json());

// Configure cors policy
app.use(cors());

// Set up a API call with GET method
app.get('/data', (req: any, res: any) => {
  // Return some sample data as the response
  res.json({
    message: 'Hello, world!',
  });
});

// Start the server on port configured in .env (recommend port 8000)
app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`);
});
