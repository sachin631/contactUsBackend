require('dotenv').config()
const express=require("express");
const cors=require("cors");
require("./db/connect")
const router=require("./routes/router")

const app=express();

app.use(cors());
app.use(express.json())
app.use(router)


// app.get("/",(req,res)=>{
//     res.status(200).json("dadsadasdasdasdasd");
// })

app.listen(6002,()=>{
    console.log("server is starting");
})