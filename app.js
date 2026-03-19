const express=require("express")
const cors=require("cors");
const router1 = require("./routes/product.route");
const router2 = require("./routes/order.route");
const router3 = require("./routes/user.route");
const router4 = require("./routes/admin.route");
const router5 = require("./routes/payment.route");
const app=express();


app.use(cors());
app.use(express.json());

app.use("/api/v1/",router1);
app.use("/api/v1/",router2);
app.use("/api/v1/",router3);
app.use("/api/v1/",router4);
app.use("/api/v1/",router5);
app.use((req,res,next)=>{
    res.send("404 route not found");
});
app.use((err, req, res, next) => {
    console.error(err);  
    res.status(500).json({ message: "Internal server error", error: err.message });
});

module.exports=app