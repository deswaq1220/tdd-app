const express = require("express");
const router = express.Router();
const productController = require("./controller/products");

router.get("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:productId", productController.getProductId);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
module.exports = router;
