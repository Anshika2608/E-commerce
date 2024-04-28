const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    id:Number,
    image:String,
    company:String,
    Title:String,
    Category:String,
    previous_price:Number,
    Current_price:Number,
    discount:String,
    Quantity:Number,
    color:String,
    star_rating:Number,
    type:String,
    Reviews:Number,
    Latest:Boolean
});
module.exports=mongoose.model('products',productSchema)
    

