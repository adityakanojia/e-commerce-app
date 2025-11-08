const Cart = require("../models/cart");
const Items = require("../models/item");

const getCartItems = async (req, res) => {
    try {
        const cart = await Cart.find().populate("itemId"); 
        
        let total = 0;
        for (let item of cart) {
        if (item.itemId && item.itemId.price) {
        total += item.qty * item.itemId.price;
        }
    }

    return res.status(200).json({ cart, total });

    } catch (error) {
        console.log("Server error");
        res.status(404).json({message:"failed request"})
    }
}

const addCartItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const existingItem = await Cart.findOne({itemId})
        
        if(existingItem){
            const existingItemInCart = await Cart.findOneAndUpdate({itemId},{qty : existingItem.qty + 1}, {new: true})
            return res.status(200).json(existingItemInCart);
        }

        const newCartItem = await Cart.create({itemId, qty: 1});
        return res.status(200).json(newCartItem);

    } catch (error) {
        console.log("server error");
        res.status(404).json({message: "request failed"})
    }
}

const deleteFromCart = async (req,res) => {
    try {
        const itemId = req.params.id;
        const itemToDelete = await Cart.findByIdAndDelete(itemId);
        res.status(200).json({
            message: "item deleted",
            deletedItem: itemToDelete
        })
    } catch (error) {
        console.log("server error");
        res.status(404).json({message:"request failed"})
    }
}

const checkout = async (req, res) => {
  try {
    const cart = await Cart.find().populate("itemId");

    if (!cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const items = [];

    for (let item of cart) {
      const price = item.itemId?.price ?? 0;
      const lineTotal = price * item.qty;

      total += lineTotal;

      items.push({
        productId: item.itemId._id,
        name: item.itemId.name,
        price,
        qty: item.qty,
        subtotal: lineTotal
      });
    }

    const receipt = {
      items,
      total,
      timestamp: new Date().toISOString(),
      orderId: Math.floor(Math.random() * 1000000)
    };

    await Cart.deleteMany({});

    return res.status(200).json({
      message: "Checkout successful",
      receipt
    });

  } catch (error) {
    console.log("server error", error);
    return res.status(500).json({ message: "Checkout failed" });
  }
};

module.exports = {getCartItems, addCartItem, deleteFromCart, checkout};