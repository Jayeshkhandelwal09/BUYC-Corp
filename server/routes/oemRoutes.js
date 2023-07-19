const express = require("express");
const { OEMspecsModel } = require("../models/OEMspecsmodel");

const oemRouter = express.Router();

oemRouter.get("/getspecs", async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
      let Specs = await OEMspecsModel.find({
        $or: [
          { nameOfmodel: { $regex: search, $options: "i" } },
          { yearOfmodel: { $regex: search, $options: "i" } },
          { colors: { $regex: search, $options: "i" } },
        ],
      });
      res.send({
        success: true,
        data: Specs,
      });
    } else {
      let Specs = await OEMspecsModel.find({});
      res.send({
        data: Specs,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  oemRouter,
};
