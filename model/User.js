const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const registration = mongoose.model("Registration", registrationSchema);

module.exports = registration;
