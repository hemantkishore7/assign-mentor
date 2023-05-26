const mongoose = require("mongoose");

mongoose.connect(process.env.URL).then((res)=>{
  if(res) console.log("Database Connected");
}).catch((e)=> console.log(e))

