const mongoose = require('mongoose');

const paramters_schema = new mongoose.Schema({

  devicetype: String,
  params: [String]

});

const ParametersModel = mongoose.model('Parameters', paramters_schema);

module.exports = {ParametersModel};