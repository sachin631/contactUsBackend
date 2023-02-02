const mongoose=require("mongoose");

const db=process.env.DATABASE;

mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connectivity")).catch((error)=>{
    console.log("sachin",error)
})