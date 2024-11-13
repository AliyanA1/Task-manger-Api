const express= require("express");
const cookieParser = require('cookie-parser');
const app=express();
const db=require("./config/db");
const userRoute=require("./routes/userRoute");
const TaskRoute=require("./routes/taskRoute"); 


app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use("/",userRoute);
app.use("/task",TaskRoute);

app.listen(process.env.PORT); 