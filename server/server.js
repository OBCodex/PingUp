// import express from 'express';
// import cors from 'cors';
// import "dotenv/config";
// import connectDB from './configs/db.js';
// import {inngest, functions, } from "./inngest/index.js"
// import {serve} from "inngest/express";
// import { clerkMiddleware } from "@clerk/express"
// import userRouter from './routes/userRoutes.js';

// const app = express();

// await connectDB();

// app.use(express.json());
// app.use(cors());
// app.use(clerkMiddleware()); // Middleware to verify Clerk webhooks

// app.get('/', (req, res) => res.send("Server is running"));
// app.use("/api/inngest", serve({ client: inngest, functions }));
// app.use("/api/user", userRouter)

// const PORT = process.env.PORT || 4000;


// app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import userRouter from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Connect to DB inside middleware for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.get('/', (req, res) => res.send("Server is running"));
app.get('/api', (req, res) => res.json({ message: "API is working" }));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/user", userRouter);

// IMPORTANT: Export for Vercel
export default app;

// Only run server in development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}