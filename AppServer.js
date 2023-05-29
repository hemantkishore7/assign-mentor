const express = require('express');
const app_server = express();
const bodyparser = require('body-parser')
const assignMentor = require("./Controller/AssignMentor.controller")


//Inject middleware
app_server.use(bodyparser.json())

//Inject controller
app_server.use("/api",assignMentor)

//Testing
app_server.get("/",(req,res)=>{
    res.status(200).send("Welcome to Assign-Mentor Project")
})

module.exports = app_server
