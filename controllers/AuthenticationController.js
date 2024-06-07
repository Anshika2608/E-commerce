const express = require("express");
const app = express();
const users = require("../Models/Users");
const bcrypt = require("bcryptjs");

const addUsers = async (req, res) => {
  const {fname,email,password,cpassword}=req.body
      if(!fname || !email || !password || !cpassword){
        res.status(422).json({error:"fill all the fields"})
      }
    try{
      const preuser=await users.findOne({email:email})
      if(preuser){
        res.status(422).json({error:"This Email is  already exists"})
      }
      else if(password !== cpassword){
        res.status(422).json({error:"password and confirm password does not matches"})
      }else{
        const finalUser=new users({
          fname,email,password,cpassword
        })
        const storeData=await finalUser.save();
        console.log(storeData)
        res.status(201).json({status:201,storeData})

      }
    }catch(err){
        res.status(422).json(err);
        console.log(err);
    }
    
  };

const loginUser= async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await users.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                 console.log(token)
                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
};
const validUser=async(req,res)=>{
  try {
      const ValidUserOne = await users.findOne({_id:req.userId});
      res.status(201).json({status:201,ValidUserOne});
  } catch (error) {
      res.status(401).json({status:401,error});
  }
};
const logoutUser=async(req,res)=>{
  try {
      req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
          return curelem.token !== req.token
      });

      res.clearCookie("usercookie",{path:"/"});

      req.rootUser.save();

      res.status(201).json({status:201})

  } catch (error) {
      res.status(401).json({status:401,error})
  }
}
  module.exports ={ addUsers,loginUser,validUser,logoutUser};