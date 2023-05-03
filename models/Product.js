const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    price:{
        type:Number,
        required:true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      default: 1,
    },
    stars: {
      type:Number,
      default: 3.2,
    },
    image: {
      type: [String],
      required: true,
    },
    featured:{
        type:Boolean,
        default:false
    }
  },
  {
    timeStamps: true,
  }
);

const Product = mongoose.model("Product" , productSchema);

module.exports = Product;
