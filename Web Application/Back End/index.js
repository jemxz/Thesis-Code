const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const subjectRoutes = require("./routes/subject-routes");
const teacherRoutes = require("./routes/teacher-routes");
const courseRoutes = require("./routes/course-routes");
const studentRoutes = require("./routes/student-routes");
const classroomRoutes = require("./routes/Classroom-routes");
const generateTestRoutes = require("./routes/generate-Test");
const cors = require("cors");

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", generateTestRoutes);
app.use("/api", classroomRoutes);
app.use("/api", subjectRoutes);
app.use("/api", teacherRoutes);
app.use("/api", studentRoutes);
app.use("/api", courseRoutes);
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
