const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
    name :{
        type:String,
        required : true,
        trim: true
    },
    assignedStudent: [{
        type:mongoose.Types.ObjectId,
        ref:"student"
    }]
});

module.exports = mongoose.model("Mentors",mentorSchema)

