const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Evaluation sub-schema
const EvaluationSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Assignment", "Quiz", "Exam", "Project", "Participation"],
  },
  description: String,
});

// Define the Course sub-schema
const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

// Define the Teacher schema that includes nested sub-documents
const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [CourseSchema],
});

// Create the model from the schema
const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
