const mongoose = require("mongoose");

const OEMspecsModelSchema = mongoose.Schema({
  nameOfmodel: { required: true, type: String },
  yearOfmodel: { required: true, type: String },
  newPriceOfVehicle: { required: true, type: Number },
  colors: { required: true, type: Array },
  mileage: { required: true, type: Number },
  power: { required: true, type: Number },
  maxSpeed: { required: true, type: Number },
  img: { required: true, type: String },
});

const OEMspecsModel = mongoose.model("oemSpecs", OEMspecsModelSchema);

module.exports = {
  OEMspecsModel,
};
