import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

app.use(express.json());
app.use(cors());

// Application routes
app.use('/api', router);


// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Mechanical Keyboard Shop.!');
});

// Global error handling middlewares
app.use(globalErrorHandler);

// Not Found Route
app.use(notFound);

export default app;
