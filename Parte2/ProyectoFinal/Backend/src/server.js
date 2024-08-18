import express from "express";
import { __dirname} from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user.router.js";
import ticketRouter from './routes/ticket.router.js';
import initMongoDB from "./db/mongoConnection.js";
import path from 'path';
import "dotenv/config";
import passport from "passport";
import { initializePassport } from "./config/passport.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

initializePassport();
app.use(passport.initialize());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('/api/auth', userRouter )
app.use('/api/tickets', ticketRouter);
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
  initMongoDB();
});
