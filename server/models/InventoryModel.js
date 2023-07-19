const mongoose = require("mongoose");
const { OEMspecsModel } = require("./OEMspecsmodel");
const { User } = require("./usermodel");

const InventoryModelSchema = new mongoose.Schema({
  km: { type: Number, required: true },
  Scratches: { type: String, required: true },
  price: { type: Number, required: true },
  orginalPaint: { type: String, required: true },
  accidents: { type: Number, required: true },
  previousBuyers: { type: Number, required: true },
  registrationPlace: { type: String, required: true },
  oemspecsId: { type: mongoose.Schema.Types.ObjectId, ref: OEMspecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  image: { type: String, required: true },
  title: { type: String, required: true },
  des: { type: Array, required: true },
});

const InventoryModel = mongoose.model("inventory", InventoryModelSchema);

module.exports = {
  InventoryModel,
};
