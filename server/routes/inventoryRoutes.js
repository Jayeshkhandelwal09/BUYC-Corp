const express = require("express");
const { InventoryModel } = require("../models/InventoryModel");
const { auth } = require("../middleware/authmiddleware");

const InventoryRouter = express.Router();

// Adding Deals
InventoryRouter.post("/inventory", async (req, res) => {
  try {
    let Inventory = InventoryModel(req.body);
    await Inventory.save();
    res.send({
      success: true,
      message: "Deal Added Successs",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

InventoryRouter.get("/inventory", async (req, res) => {
  const { order, filter } = req.query;
  try {
    if (filter === "price") {
      let Deal;
      // Descending Sorting
      if (order == "desc") {
        Deal = await InventoryModel.find({})
          .populate("oemspecsId")
          .sort({ price: -1 });
      } else {
        // Ascending Sorting
        Deal = await InventoryModel.find({})
          .populate("oemspecsId")
          .sort({ price: 1 });
      }

      res.send({
        data: Deal,
      });

      // Filtering on the basis of mileage
    } else if (filter == "mileage") {
      let Deal = await InventoryModel.find({}).populate("oemspecsId").lean();
      // Descending Sorting
      if (order == "desc") {
        Deal.sort((a, b) => b.oemspecsId.mileage - a.oemspecsId.mileage);
        // Ascending Sorting
      } else {
        Deal.sort((a, b) => a.oemspecsId.mileage - b.oemspecsId.mileage);
      }

      res.send({
        data: Deal,
      });

      // Filtering on the basis of colours
    } else if (filter === "colors") {
      let Deal = await InventoryModel.find({}).populate({
        path: "oemspecsId",
        match: { colors: { $regex: order, $options: "i" } },
      });
      Deal = Deal.filter((deal) => deal.oemspecsId !== null);

      res.send({
        data: Deal,
      });
    } else {
      let Deal = await InventoryModel.find({}).populate({
        path: "oemspecsId",
      });

      res.send({
        data: Deal,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

InventoryRouter.get("/done", auth, async (req, res) => {
    res.send({ msg: "Done" });
});

InventoryRouter.get("/inventory/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let Deal = await InventoryModel.findById(id);
      res.send({
        data: Deal,
      });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          });
    }
  });
  
InventoryRouter.patch("/inventory/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await InventoryModel.findByIdAndUpdate(id, req.body);
      res.send({
         message : "Updated Deal Successfully" 
    });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          });
    }
  });
  
InventoryRouter.delete("/inventory/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await InventoryModel.findByIdAndDelete(id);
      res.send({
        message : "Deleted Deal Successfully" 
    });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
          });
    }
  });
  
  module.exports={
    InventoryRouter 
};
  
