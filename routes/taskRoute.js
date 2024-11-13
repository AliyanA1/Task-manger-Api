const express=require("express");
const route=express.Router();
const {checkpost}=require("../middlewares/authmiddleware");
const {createTask,getTask,deleteTask}=require("../controllers/taskCreate");


route.post("/",checkpost,createTask);

route.get("/",checkpost,getTask);

route.delete("/delete/:taskId",deleteTask);


module.exports=route;