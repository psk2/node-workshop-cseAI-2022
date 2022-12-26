var mongoose = require("mongoose");
const StudentSchema = mongoose.Schema(
  {
    studentId: String,
    firstName: String,
    lastName: String,
    gender: String,
    phoneNumber: Number,
    address: { type: Array, default: [] },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("Student", StudentSchema);
