import Cloudinary from "../config/cloudinary.js";
import Products from "../models/products.js";
import messages from "../utils/messages.js";

const createProduct = async (req, res) => {
  const file = req.file;
  const body = req.body;

  if(file) {
    try {
      const detail = await Products.findOne({name: body.name});
      if(detail) {
        return messages(res, 400, "Product already exist");
      };
      
      const result = await Cloudinary.uploader.upload(file.path); //upload image to cloudinary
      let product = await new Products ({
        ...body,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      }).save();

     messages(res, 201, "Create Success", product);
    
    } catch (error) {
      messages(res, 500, error?.message || "Internal Server Error");
    }
  } else {
    messages(res, 423, "Image is required");
  }
};

const allProducts = async (req, res) => {
  try {
    const result = await Products.find();
    messages(res, 200, "All Data", result)
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const detailProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await Products.findById(id);

    if(detail) {
      return messages(res, 200, "Detail Product", detail);
    } else {
      return messages(res, 404, "Product not found");
    }
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const detail = await Products.findById(id);

    if (!detail) return messages(res, 404, "Product not found");

    // delete image from cloudinary
    await Cloudinary.uploader.destroy(detail.cloudinary_id);

    // delete Product from db
    await Products.deleteOne(detail._id);
    messages(res, 200, "Delete product success");
  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.file;

  try {
    let detail = await Products.findById(id);
    const data = { ...body };

    if(!detail) {
      return messages(res, 404, "Product not found");
    };

    if(file) {
      await Cloudinary.uploader.destroy(detail.cloudinary_id);

      const result = await Cloudinary.uploader.upload(file.path);

      data.image = result.secure_url;
      data.cloudinary_id = result.public_id;
    };

    const newData = await Products.findByIdAndUpdate(id, data, {
      new: true,
    });

    messages(res, 200, "Update products Success", newData);

  } catch (error) {
    messages(res, 500, error?.message || "Internal Server Error");
  }
};

export { createProduct, allProducts, detailProduct, deleteProduct, updateProduct };