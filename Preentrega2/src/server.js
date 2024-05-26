import express from "express";
import { __dirname } from "./utils.js";
import { productRouter } from "./routes/products.router.js";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from "./manager/products.manager.js";
import { path } from "./utils.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const productManager = new ProductManager(path);

app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

app.use('/',productRouter );


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)});

const socketServer = new Server(server)

socketServer.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');
    

    socket.emit('products', await productManager.getProducts())

    socket.on('newProduct', async (data) => {
        await productManager.insertProduct(data)
        const products = await productManager.getProducts();
        socketServer.emit('products', products)
    })
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    })

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id)
        const products = await productManager.getProducts();
        socketServer.emit('products', products)
    })
})