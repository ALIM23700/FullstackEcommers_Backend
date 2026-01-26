const app=require("./app")
const dotenv=require('dotenv')
require("../Backend/models/model.db")

dotenv.config();

const PORT=process.env.PORT 


app.listen(PORT,()=>{
    console.log(`server is running at:http://localhost:${PORT}`)
})