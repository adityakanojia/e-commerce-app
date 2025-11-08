const mongoose = require("mongoose");
const Items = require("./models/item");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
  await Items.insertMany([
    {name: "T-Shirt", price: 499 },
    {name: "Shoes", price: 1999 },
    {name: "Cap", price: 299 },
    {name: "Bag", price: 899 },
    {name:"ps5", price: 50000},
    {name: "canon 5", price: 60000},
    {name: "gaming laptop", price: 80000}
  ]);
  console.log("Products added");
  process.exit();
});
