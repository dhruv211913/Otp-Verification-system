const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("Database connected succesfully"))
.catch((error)=>console.log("error",error))
