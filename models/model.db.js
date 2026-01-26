const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
mongoose.connect(process.env.MONGO_URL )
.then(()=>{
    console.log("mongodb is connected")
})
.catch((err)=>{
    console.log("connection error",err)
})
