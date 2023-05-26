const assignMentor = require("express").Router();
const mentorModel = require("../Model/Mentor.model");
const studentModel = require("../Model/Student.model");

//Create Mentor
assignMentor.post("/mentor", async function (req, res) {
  try {
    const { name } = req.body;
    let mentor;
    mentor = new mentorModel({ name });
    mentor = await mentor.save();

    if (!mentor) {
      res.status(400).json({
        message: "bad request",
      });
    }
    res.status(200).json({
      success: true,
      data: mentor,
    });
  } catch (e) {
    console.log(e);
  }
});

//Create Student
assignMentor.post("/student", async function (req, res) {
  try {
    const { name } = req.body;
    let student;
    student = new studentModel({ name });
    student = await student.save();

    if (!student) {
      res.status(400).json({
        message: "bad request",
      });
    }
    res.status(200).json({
      data: student,
    });
  } catch (error) {
    console.log(error);
  }
});

//Assign Student to mentor
assignMentor.post(
  "/mentor/:mentorId/student/:studentId",
  async function (req, res) {
    try {
      const { mentorId, studentId } = req.params;
      const mentor = await mentorModel.findById(mentorId);
      const student = await studentModel.findById(studentId);

      if (!student || !mentor) {
        res.status(404).json({ message: "Not found" });
      }

      if (student.assignedMentor) {
        res.status(400).json({ message: "Student already assigned" });
      }

      if (!mentor.assignedStudent) {
        mentor.assignedStudent = [];
      }

      mentor.assignedStudent.push(student);
      student.assignedMentor = mentor;
      await mentor.save();
      await student.save();
      res.status(200).json({
        success: true,
        data: mentor,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

//Assign or change mentor for particular student
assignMentor.put(
  "/student/:studentId/mentor/:mentorId",
  async function (req, res) {
    const { studentId, mentorId } = req.params;
    try {
      const mentor = await mentorModel.findById(mentorId);
      const student = await studentModel.findById(studentId);

      if (!student || !mentor) {
        res.status(404).json({ message: "Not found" });
      }

      if (student.assignedMentor) {
        student.assignedMentor.assignedStudent.pull(student);
        await student.assignedMentor.save();
      }

      if (!mentor.assignedStudent) {
        mentor.assignedStudent = [];
      }

      mentor.assignedStudent.push(student);
      student.assignedMentor = mentor;
      await mentor.save();
      await student.save();
      res.status(200).json({
        success: true,
        data: student,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

//Shows all student for a particular mentor
assignMentor.get("mentor/:mentorId/students", async function (req, res) {
  try {
    const { mentorId } = req.params;
    const mentor = await mentorModel
      .findById(mentorId)
      .populate("assignedStudent");

    if (!mentor) return res.status(404).json({ error: "not found" });
    return res.status(200).json({ data:mentor.assignedStudent});
  } catch (error) {
    console.log(error);
  }
});

//Show previously asssigned mentor for a particular student
assignMentor.get("/students/:studentId/mentor", async function (req, res) {
  try {
    const { studentId } = req.params;
    const student = await studentModel
      .findById(studentId)
      .populate("assignedMentor","name");

      if(!student){return res.status(404).json({error:"not found"})}
    res.status(200).json({data:student.assignedMentor})
  } catch (error) {
    console.log(error);
  }
});

module.exports = assignMentor;
