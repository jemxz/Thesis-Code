const express = require("express");
const Teacher = require("../model/Teacher"); // Adjust the path as needed
const Subject = require("../model/Subject"); // Adjust the path as needed

const router = express.Router();

// Create a new teacher
router.post("/teachers", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all teachers
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single teacher by ID
router.get("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.status(200).send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a teacher by ID
router.put("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      return res.status(404).send();
    }
    res.status(200).send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a teacher by ID
router.delete("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).send();
    }
    res.status(200).send(teacher);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
