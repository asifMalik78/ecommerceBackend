const Product = require("../models/Product");

// add product
module.exports.addProduct = async (req, res) => {
  try {
    const product = await new Product(req.body);
    product.save();
    return res.status(201).json({
      product,
      message: "Product Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// get the product (single)
module.exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// get all products
module.exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// delete product
module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    return res.status(201).json({
      message: "product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};

// update product
module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(201).json({
      product,
      message: "product modified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      err: error.message,
    });
  }
};
