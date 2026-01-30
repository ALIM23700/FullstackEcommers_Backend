const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controller/product.controller");
const { isAdmin, protect } = require("../middleware/auth");


const router1 = express.Router();


router1.get("/products",getProducts);

router1.post("/create",protect,isAdmin,createProduct);
router1.put("/update/:id",protect,isAdmin,updateProduct);
router1.delete("/delete/:id",protect,isAdmin,deleteProduct);

module.exports = router1;
