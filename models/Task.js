const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    title:{
        type: String,
        required: [true," title is must required"],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "description is must required"],
        trim: true,
    },
    status:{
        type:String,
        enum: ["progress","pending","completed"],
        default: "pending",
    },
   
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "task must have an admin"]
   }
},{timeStamps:true});

module.exports= mongoose.model("Task",taskSchema);