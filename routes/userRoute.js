const express=require('express');
const route=express.Router();
const {userResgister,loginUser,CheckAll}= require("../controllers/userRegister");


route.get("/all",CheckAll);

route.post("/register",userResgister);

route.post("/login",loginUser);


module.exports=route;