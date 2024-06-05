import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.use("/user", userRoutes)
app.use("/employee", employeeRoutes)


app.use('', express.static(join(__dirname, '/uploads')));
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));
