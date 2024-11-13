const userTask=require("../models/Task");
const userModel=require("../models/user");
const taskModle=require("../models/Task");
const jwt=require("jsonwebtoken")

module.exports.createTask= async (req,res)=>{
   try{
    let {title, description}=req.body;
    //creating created by
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userModel.findOne({ email: decoded.email }).select("-password");
    
    let task=await userTask.create({
        title,
        description,
        createdBy:user._id,
    });
    res.send(task);
   }
   catch(err){
     console.error("there is an error in creating the task", err);
   }
}

module.exports.getTask= async (req,res)=>{
    try{
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userModel.findOne({ email: decoded.email }).select("-password");
    if(user){
        let taks=await taskModle.find({createdBy: user._id})
        res.send(taks);
    }
   
    }
    catch(err){
        res.send("ther is an error",err)
    }
    
}

module.exports.deleteTask = async (req, res) => {
  try {
    // Get the task ID from request parameters
    const { taskId } = req.params;

    // Verify user with JWT from cookies
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userModel.findOne({ email: decoded.email }).select('-password');

    // Find the task and ensure the user is the owner
    let task = await taskModle.findOne({ _id: taskId, createdBy: user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Delete the task
    await taskModle.deleteOne({ _id: taskId });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting the task', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
