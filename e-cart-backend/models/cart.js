const mongoose = require("mongoose");

const {Schema} = mongoose;

const cartSchema = new Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
    qty: {type: Number, default: 0}
});

module.exports = mongoose.model("Cart",cartSchema)