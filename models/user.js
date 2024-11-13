const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required"],
        trim: true,
    },
    email:{
        type: String,
        required: [true, "email must required"],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
            'Please enter a valid email address', 
          ],
    },
    password:{
        type: String,
        required: [true, "password must be required"],
        minlength: [8,"password must be at least 8 char long"]

    },
    role:{
        type: String,
        enum:["admin", "user"],
        default: "user",
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);