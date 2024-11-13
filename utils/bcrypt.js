const bcrypt = require("bcrypt");

// Function to hash a password
module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

module.exports.comparePassword= async (password, hashPassword)=>{
  try{
    let check = await bcrypt.compare(password,hashPassword);
    return check;
  }
  catch(err){
    console.log("there is an Error", err)
  }
}
