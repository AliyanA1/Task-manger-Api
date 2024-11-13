const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.checkpost = async function (req, res, next) {
    try {
        // Use req.cookies instead of req.cookie
        if (!req.cookies.token) {
            return res.send("You need to login first");
            // Optionally: return res.redirect("/login");
        }

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let user = await userModel.findOne({ email: decoded.email }).select("-password");

        req.user = user;
        next();
    } catch (error) {
        console.error(error); // Optional: Log the error for debugging
        res.redirect("/login");
    }
};
