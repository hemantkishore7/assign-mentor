const express = require('express');
const app_server = express();
const bodyparser = require('body-parser')
const assignMentor = require("./Controller/AssignMentor.controller")


//Inject middleware
app_server.use(bodyparser.json())

//Inject controller
app_server.use("/",assignMentor)

module.exports = app_server
