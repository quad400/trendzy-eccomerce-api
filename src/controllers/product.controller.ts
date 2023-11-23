import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Product } from "../models/product.model";
import validateMongoDbId from "../utils/validateMongoDbId";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const isTitleExist = Product.findOne({ title });
      if (await isTitleExist)
        throw new Error("Product with this title already exist");
      const newProduct = await Product.create(req.body);
      res.status(201).json({
        status: "successful",
        message: "Product successfully created",
        data: newProduct,
      });
    } catch (error: any) {
      res.status(400).json({
        status: "unsuccessful",
        message: error.message,
      });
    }
  }
);

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    validateMongoDbId(id);

    const productDetail = await Product.findById(id);
    res.status(200).json({
      status: "successful",
      data: productDetail,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "unsuccessful",
      message: error.message,
    });
  }
});

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      validateMongoDbId(id);

      const updatedProduct = await Product.findByIdAndUpdate({ id }, req.body, {
        new: true,
      });
      res.status(200).json({
        status: "successful",
        message: "product successfully updated",
        data: updatedProduct,
      });
    } catch (error: any) {
      res.status(400).json({
        status: "unsuccessful",
        message: error.message,
      });
    }
  }
);
