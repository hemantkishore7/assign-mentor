const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
       
    },
    assignedMentor:{
        type:mongoose.Types.ObjectId,
        ref:"mentor"
    }
});

module.exports = mongoose.model("Students",studentSchema)