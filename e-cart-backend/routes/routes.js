const express = require('express');
const router = express.Router();

const {getAllItems} = require("../handlers/itemsHandler");
const {getCartItems, addCartItem, deleteFromCart, checkout} = require("../handlers/cartHandler")

// routes for item
router.get("/api/items",getAllItems);

// routes for cart
router.get("/api/cart", getCartItems);
router.post("/api/add-item/:id",addCartItem);
router.delete("/api/delete-item/:id", deleteFromCart);

//checkout api
router.get("/api/checkout",checkout)

module.exports = router;

