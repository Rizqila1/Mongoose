import express from "express";
import { allProducts, createProduct, deleteProduct, detailProduct, updateProduct } from "../controllers/products.js";
import uploadImg from "../middleware/multer.js";


const Router = express.Router();

Router.post('/products', uploadImg, createProduct);
Router.get('/products', allProducts);
Router.get('/products/:id', detailProduct);
Router.delete('/products/:id', deleteProduct);
Router.put('/products/:id', uploadImg, updateProduct);

export default Router;