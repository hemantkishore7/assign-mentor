require('dotenv').config()
const express = require('express');
const app_server = require('./AppServer');
const nodeServer = express();
const connectDb = require("./Dbconfig")

connectDb();

//Inject app_server
nodeServer.use('/',app_server)


//Start the Port
const port=  process.env.PORT;


nodeServer.listen(port,()=>{
    console.log("Node_Server Started on",port);
    
})