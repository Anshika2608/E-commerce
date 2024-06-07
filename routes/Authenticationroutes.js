const express=require('express')
const router = express.Router();
const {addUsers,loginUser,validUser, logoutUser} = require("../controllers/AuthenticationController");
const users = require("../Models/Users");
const authenticate=require("../MiddleWare/authenticate")
router.route("/").post(addUsers);
router.route("/login").post(loginUser);
router.route("/validuser").get(authenticate, validUser);

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

       // res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})
module.exports=router;