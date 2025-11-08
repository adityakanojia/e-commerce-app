const Items = require("../models/item")

const getAllItems = async (req, res) => {
    try {
        const items = await Items.find();
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(404).json({message : "Failed request" })
    }
}



module.exports = {getAllItems};