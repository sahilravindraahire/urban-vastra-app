import { Product } from "../models/Product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new apiError(402, "error while fetching products");
  }

  return res.status(200).json(new apiResponse(200, products));
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new apiError(404, "error while fetching product");
  }

  return res.status(200).json(new apiResponse(200, product));
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    throw new apiError(400, "all fields are required");
  }

  let imageUrl = "";
  let imagePublicId = "";

  if (req.file) {
    const filePath = req.file.path.replace(/\\/g, "/");
    // const uploadResponse = await cloudinary.uploader.upload(filePath)

    // if(!uploadResponse){
    //     throw new apiError(500, "error while uploading product images on cloudinary")
    // }

    // imageUrl = uploadResponse.secure_url
    // imagePublicId = uploadResponse.public_id

    try {
      const uploadResponse = await cloudinary.uploader.upload(filePath);
      imageUrl = uploadResponse.secure_url;
      imagePublicId = uploadResponse.public_id;
      console.log("Cloudinary upload success:", imageUrl);
    } catch (cloudinaryError) {
      console.log("Cloudinary error:", cloudinaryError.message); 
      throw new apiError(
        500,
        "cloudinary upload failed: " + cloudinaryError.message,
      );
    }
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    imageUrl,
    imagePublicId,
  });

  const createdProduct = await product.save();

  if (!createdProduct) {
    throw new apiError(500, "error while creating product");
  }

  return res.status(201).json(new apiResponse(201, createdProduct));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    throw new apiError(400, "No fields provided to update");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new apiError(402, "error while fetching product");
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.stock = stock || product.stock;

  if (req.file) {
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    const uploadRes = await cloudinary.uploader.upload(req.file?.path);

    if (!uploadRes) {
      throw new apiError(400, "error while updating product image");
    }

    product.imageUrl = uploadRes.secure_url;
    product.imagePublicId = uploadRes.public_id;
  }

  const updatedProduct = await product.save();

  return res.status(200).json(new apiResponse(200, updatedProduct));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new apiError(404, "product not found");
  }

  if (product.imagePublicId) {
    await cloudinary.uploader.destroy(product.imagePublicId);
  }

  await product.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, "product removed successfully"));
});
