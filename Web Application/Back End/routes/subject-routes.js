const express = require("express");
const Subject = require("../model/Subject"); // Adjust the path as needed
const Teacher = require("../model/Teacher"); // Adjust the path as needed

const router = express.Router();

// Add a new subject
router.post("/subjects", async (req, res) => {
  try {
    const { name, symbol } = req.body;
    const newSubject = new Subject({ name, symbol });
    await newSubject.save();
    res.status(201).send(newSubject);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all subjects
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).send(subjects);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a subject to a course in a teacher document
router.post(
  "/teachers/:teacherId/courses/:courseId/subjects",
  async (req, res) => {
    try {
      const { teacherId, courseId } = req.params;
      const { subjectId } = req.body;

      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).send({ error: "Teacher not found" });
      }

      const course = teacher.courses.id(courseId);
      if (!course) {
        return res.status(404).send({ error: "Course not found" });
      }

      course.subjects.push(subjectId);
      await teacher.save();

      res.status(200).send(teacher);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);
//

module.exports = router;
