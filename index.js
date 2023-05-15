import express from "express";
import cors from "cors";
import r_products from "./src/routers/products.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2", r_products);

app.listen(2001, () => console.log("Server running"));