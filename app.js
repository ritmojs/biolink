const mongoose = require('mongoose');
const express=require("express");
const app=express();
const cors=require("cors");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
require("dotenv").config();



const path=require("path");
//Routers path
const linkRoutes=require("./routes/links");
const authRoutes=require("./routes/auth");
//const userRoutes=require("./routes/user")

//My middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//My Routes
app.use("/api",linkRoutes);
app.use("/api",authRoutes);
//app.use("/api",userRoutes);
//Step-2
if(process.env.NODE_ENV === 'production')
{app.use(express.static('client/build'));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
});

}

//DB connections
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/biolink',
    {useNewUrlParser: true,
        useUnifiedTopology: true,
         useCreateIndex:true})
         .then(()=>{
             console.log("DB CONNECTED")
         })
         //My PORT
    const port=process.env.PORT || 8000;
    app.listen(port,()=>{
        console.log(`app is running at ${port}`);
    });
   