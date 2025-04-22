const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  gender: String,
  mobilePrimary: String,
  mobileReentered: String,
  mobileAlternate: String,
  country: String,
  state: String,
  city: String,
  idProofType: String,
  photo: String,
  signature: String,
  idProof: String,
}, { timestamps: true });

const RegistrationModel = mongoose.model('Registration', registrationSchema);
module.exports = RegistrationModel;