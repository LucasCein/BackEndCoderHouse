import express from "express";
import { __dirname } from "./utils.js";
import { productRouter } from "./src/routes/products.router.js";
import { cartRouter } from "./src/routes/carts.router.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.use('/api/products',productRouter );
app.use('/api/carts',cartRouter );

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)});

