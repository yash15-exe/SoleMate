import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnect } from "./Utilities/DbConnect.js";
import productRoutes from "./Routes/products.routes.js"
import authRoutes from "./Routes/auth.routes.js"
import bodyParser from 'body-parser';
import paymentRoutes from "./Routes/payment.routes.js"
import orderRoutes from "./Routes/order.routes.js"
const app = express();
config();

app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); 
await dbConnect(process.env.DATABASE_URL);

app.use(cors({
  origin: 'https://solemate-app.vercel.app', // Allow requests from your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use("/api", authRoutes)
app.use("/api", productRoutes)
app.use("/api",paymentRoutes)
app.use("/api", orderRoutes)
const SERVER_PORT = process.env.PORT || 5000
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
