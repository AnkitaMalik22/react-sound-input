const mongoose = require('mongoose');


const formDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  panNumber: {
    type: Number,
    required: true ,
  },
});


const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
