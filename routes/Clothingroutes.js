const express = require("express");
const router = express.Router();
const { MenTopwear } = require("../controllers/ClothingController");

router.route("/").get(MenTopwear);
// router.route('/women').get(womenProducts);

module.exports = router;
