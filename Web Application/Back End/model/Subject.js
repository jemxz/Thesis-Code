const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Subject schema
const SubjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create the model from the schema
const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
