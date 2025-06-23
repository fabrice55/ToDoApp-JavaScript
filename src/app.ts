import express, { Request, Response, NextFunction } from 'express';
const app = express();
import path from 'path';
import apiRouter from './routes/api.routes';
import webRouter from './routes/web.routes';
import db from './db';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Routers
app.use('/api', apiRouter);
app.use('/', webRouter);

if (!db) {
  console.error("Database is not initialized yet!");
  process.exit(1);
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Global Express error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Express Unhandled Error:", err);
  const isApi = req.path.startsWith('/api');
  res.status(500).json(isApi ? { error: "Something went wrong. Please try again later." } : "Something went wrong. Please try again later.");
});

// Process-wide crash prevention listeners
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown:', error);
});

export default app;
