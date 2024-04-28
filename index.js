const express = require("express");
require("./config/config");
const Product = require("./Product");
const cors = require("cors");
const dotenv=require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port=process.env.PORT || 3000;

app.use("/api/home", require("./routes/Homeroutes"));
app.use("/api/home",require("./routes/Homeroutes"))
app.use("/api/menTopWear",require("./routes/Clothingroutes"))

// app.get("/",async (req,res)=>{
//     try {
//         let data = await Product.find({ Latest: true });
//         res.send(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// })

// app.get("/Women", async (req, res) => {
//   try {
//     let data = await Product.find({ gender: "Women" }).limit(4);
//     res.send(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
