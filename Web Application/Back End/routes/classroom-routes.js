const express = require("express");
const router = express.Router();
const Class = require("../model/Classroom");
const Student = require("../model/Student");
const Grade = require("../model/Grade");

router.get("/classroom", async (req, res) => {
  try {
    const classrooms = await Class.find().populate({
      path: "students",
      populate: { path: "grades" },
    });
    res.json(classrooms);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    res.status(500).json({ message: "Error fetching classrooms", error });
  }
});

router.post("/classroom", async (req, res) => {
  console.log("post hit");
  req.body.students.map((element) => {
    element.grades = [element.grades];
  });
  const { name, color, students } = req.body;

  try {
    // Create and save students along with their grades
    const studentIds = await Promise.all(
      students.map(async (studentData) => {
        console.log(studentData);
        const gradeIds = await Promise.all(
          studentData.grades.map(async (gradeData) => {
            const grade = new Grade(gradeData);
            await grade.save();
            return grade._id;
          })
        );

        const student = new Student({
          ...studentData,
          grades: gradeIds,
        });
        await student.save();
        return student._id;
      })
    );

    // Create and save the class with student references
    const newClass = new Class({
      name,
      color,
      students: studentIds,
    });
    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the class" });
  }
});

// Read Class
// router.get("/classrooms/:id", async (req, res) => {
//   try {
//     const classInstance = await Class.findById(req.params.id);
//     if (!classInstance)
//       return res.status(404).json({ message: "Class not found" });
//     res.json(classInstance);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
