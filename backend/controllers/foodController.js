import foodModel from "../models/foodModel.js";

import fs from "fs";

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const { name, description, price, category } = req.body; // ✅ Destructure from req.body

    if (!name || !description || !price || !category) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name,
      description,
      price,
      image: image_filename,
      category,
    });

    await food.save();

    res.json({
      success: true,
      message: "Food added successfully",
      data: food,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: e.message,
    });
  }
};


const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            message: "Foods fetched successfully",
            data: foods
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({
                success: false,
                message: "Food not found"
            })
        }
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food deleted successfully"
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

export { addFood, listFood, removeFood };