const express = require("express");
const {verifyToken , verifyTokenAdmin} = require("../middlewares/verifyToken");
const {addProduct , getAllProduct , getSingleProduct, updateProduct , deleteProduct} = require("../controllers/Product_Controller");

const router = express.Router();

// add product
router.post("/add" , verifyToken , verifyTokenAdmin , addProduct);

// delete product
router.delete("/:id" , verifyToken , verifyTokenAdmin , deleteProduct);

// update product
router.put("/:id" , verifyToken , verifyTokenAdmin , updateProduct);

// get all product
router.get("/all" , getAllProduct);

// get single product
router.get("/:id" , getSingleProduct);

module.exports=router;