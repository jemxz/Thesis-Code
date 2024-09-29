const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GradeSchema = require("./Grade").schema;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  grades: [{ type: Schema.Types.ObjectId, ref: "Grade" }],
});

module.exports = mongoose.model("Student", StudentSchema);
