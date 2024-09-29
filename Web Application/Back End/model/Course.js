const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubjectSchema = require("./Subject").schema;
const ClassSchema = require("./Classroom").schema;
const DateSchema = require("./Date").schema;

const CourseSchema = new Schema({
  NameOfTeacher: { type: String, required: true },
  subjects: [SubjectSchema],
  classes: [ClassSchema],
  dates: [DateSchema],
});

module.exports = mongoose.model("Course", CourseSchema);
