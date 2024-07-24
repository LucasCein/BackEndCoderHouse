import express from "express";
import { __dirname} from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/user.router.js";
import handlebars from "express-handlebars";
import initMongoDB from "./db/mongoConnection.js";
import path from 'path';
import "dotenv/config";
import passport from "passport";
import { initializePassport } from "./config/passport.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

const hbs = handlebars.create({
    extname: '.handlebars', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts/', 
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
  });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

initializePassport();
app.use(passport.initialize());
app.use("/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('/auth', userRouter )
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
  initMongoDB();
});
