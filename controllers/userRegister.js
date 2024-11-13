const userModle=require("../models/user");
const {hashPassword,comparePassword}=require("../utils/bcrypt");
const {jsonwebToken}=require("../utils/jwt");

module.exports.CheckAll=async (req,res)=>{
  let all= await userModle.find();
   res.send(all);

}

module.exports.userResgister= async (req,res)=>{
    let {name,email, password}=req.body;
    password=await hashPassword(password);
    let check= await userModle.findOne({email});
    if(check) return res.send("this email already exits");
    let user= await userModle.create({
        name,
        email,
        password,
    });
    let token=jsonwebToken(user);
    res.cookie("token",token, {httpOnly: true});

    res.send(user);
}

module.exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await userModle.findOne({ email });
      if (!user) {
        return res.status(400).send("Invalid email or password");
      }
  
      // Compare passwords
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid email or password");
      }
     //set cookies
    let token= jsonwebToken(user);
    res.cookie("token", token,{
        httpOnly:true,
        secure: true,
        samesite: "strict",
    });
    // Successful login
    res.status(200).send("You can login");
      
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Something went wrong. Please try again later.");
    }
  };