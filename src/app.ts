import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173','https://mech-arcade-seven.vercel.app'],
    credentials: true,
  }),
);
app.use(express.json());

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

// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST'],
//     credentials: true,
//     // origin: ["http://localhost:5173", "https://mech-arcade-backend.vercel.app"],
//   }),
// );
