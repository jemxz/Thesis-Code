const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = require("./Student").schema;

const ClassSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Class", ClassSchema);
