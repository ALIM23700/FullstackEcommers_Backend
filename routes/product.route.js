const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controller/product.controller");


const router1 = express.Router();


router1.get("/products",getProducts);

router1.post("/create",createProduct);
router1.put("/update/:id",updateProduct);
router1.delete("/delete/:id",deleteProduct);

module.exports = router1;
