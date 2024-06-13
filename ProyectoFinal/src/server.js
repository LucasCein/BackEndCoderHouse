import express from "express";
import { __dirname} from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import initMongoDB from "./db/mongoConnection.js";
import path from 'path';
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));


const hbs = handlebars.create({
    extname: '.handlebars', // Extensión de archivo para plantillas
    defaultLayout: 'main', // Puedes definir un layout por defecto
    layoutsDir: __dirname + '/views/layouts/', // Ruta al directorio de layouts
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
  });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/products", productRouter);
app.use("/api/carts", cartRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
  initMongoDB();
});
