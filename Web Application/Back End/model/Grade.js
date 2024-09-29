const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GradeSchema = new Schema({
  attendance: { type: String, required: true },
  project: { type: String, required: true },
  schoolWork: { type: String, required: true },
  participation: { type: String, required: true },
});

module.exports = mongoose.model("Grade", GradeSchema);
