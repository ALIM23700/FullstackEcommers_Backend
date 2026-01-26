const express=require("express")
const cors=require("cors")
const app=express();


app.use(cors());
app.use(express.json());


app.use((req,res,next)=>{
    res.send("404 route not found");
});
app.use((err,req,res,next)=>{
    res.send("Internal server found");
})

module.exports=app