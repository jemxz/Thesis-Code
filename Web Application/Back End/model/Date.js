const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateSchema = new Schema(
  {
    hour: { type: Number, required: true },
    date: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { _id: false }
);

module.exports = mongoose.model("Date", DateSchema);
