const jwt= require("jsonwebtoken");
require("dotenv").config();

module.exports.jsonwebToken= (user)=>{
  return jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET);
  
}