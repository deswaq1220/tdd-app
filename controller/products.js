const productModel = require("../models/Product");

exports.createProduct = (req, res, next) => {
  try {
    const createProduct = productModel.create(req.body);
    console.log("createProduct", createProduct);
    res.status(201).json(createProduct);
  } catch (error) {
    next(error);
  }
};
