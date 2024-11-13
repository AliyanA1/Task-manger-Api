const mongoose=require("mongoose");
require("dotenv").config();

const uri=process.env.DB_URI;

mongoose.connect(uri)
.then(()=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.error("error", err)
})