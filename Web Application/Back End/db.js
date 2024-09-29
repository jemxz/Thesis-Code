const mongoose = require("mongoose");
const Teacher = require("./model/Teacher"); // Adjust the path according to your project structure

mongoose.connect("mongodb://localhost:27017/lms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const newTeacher = new Teacher({
  name: "John Doe",
  email: "john.doe@example.com",
  courses: [
    {
      title: "Mathematics 101",
      description: "An introductory course to Mathematics",
      subjects: [
        {
          name: "Algebra",
          date: new Date("2024-06-15"),
          time: "10:00 AM",
          evaluations: [
            { type: "Quiz", description: "Algebra Quiz" },
            { type: "Assignment", description: "Homework Assignment 1" },
          ],
        },
        {
          name: "Calculus",
          date: new Date("2024-06-17"),
          time: "12:00 PM",
          evaluations: [
            { type: "Exam", description: "Midterm Exam" },
            { type: "Project", description: "Calculus Project" },
          ],
        },
      ],
    },
  ],
});

newTeacher
  .save()
  .then(() => console.log("Teacher saved successfully"))
  .catch((err) => console.log("Error saving teacher: ", err));
