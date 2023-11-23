import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: [true, "please add a title"],
    },
    description: {
      type: String,
      required: [true, "please add a description"],
    },
    price: {
      type: Number,
      required: [true, "please add a price"],
    },
    category: {
      type: String,
      required: [true, "please add a category"],
      enum: ["men", "women"],
    },
    brand: {
      type: String,
      required: [true, "please add a brand"],
    },
    quantity: {
      type: Number,
      required: [true, "please add a quantity"],
    },
    images: {
      type: Array,
      default: [],
    },
    colors: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
