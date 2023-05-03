const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },

    products:{
        type:[Schema.Types.ObjectId],
        ref:'Product',
    }
});

const Order = mongoose.model("Order" , orderSchema);

module.exports = Order;