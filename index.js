require('dotenv').config()
const express = require('express');
const app_server = require('./AppServer');
const nodeServer = express();

//Inject app_server
nodeServer.use('/',app_server)


//Start the Port
const port=  process.env.PORT;


nodeServer.listen(port,"localhost",()=>{
    console.log("Node_Server Started on",port);
    require("./Dbconfig")
})