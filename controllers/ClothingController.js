const Product = require("../Product");
const express = require("express");
const app = express();

// Import middleware
const handleQuery = require("../MiddleWare/middleware");

// Apply middleware to all routes
app.use(handleQuery);

const fetchMenTopwearProducts = async (req, res) => {
  try {
    let { company, Category, color } = req.query;

    // Use filtered query parameters from middleware
    let filter = { type: "Topwear", gender: "Men", ...req.filter };
    let sort = req.sort || {};
    let data = await Product.find(filter).sort(sort);

    if (data.length === 0) {
      res.status(404).json({ success: false, message: "No products found" });
    } else {
      res.status(200).json({ success: true, data: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { MenTopwear: fetchMenTopwearProducts };
