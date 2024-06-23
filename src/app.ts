import express, { Application } from "express";
import identityRoutes from "./routes/identity";
// import { errorHandler } from "./middlewares/errorHandlers";

const app: Application = express();

app.use(express.json()); // Middleware for JSON body parsing

// Routes
app.use("/", identityRoutes);

export default app;
