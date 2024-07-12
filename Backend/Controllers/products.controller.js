import productModel from "../Models/Product.model.js";
import { removeFromCloudinary, uploadToCloudinary } from "../Utilities/CloudinaryUtility.js";

export const addProducts = async (req, res) => {
  const product = req.body;
  const file = product.file
  try {
    if (product) {
    
      const { secure_url, public_id } = await uploadToCloudinary(file, "/solemate/products");

      // Convert the tax rate from percentage to a decimal fraction
      const taxRate = product.taxRate / 100;

      const newProduct = new productModel({
        name: product.name,
        productBrand: product.productBrand,
        description: product.description,
        price: product.price,
        imageUrl: secure_url,
        availableUnits: product.availableUnits,
        unitsSold: product.unitsSold,
        imagePublicId: public_id,
        taxRate: taxRate,
      });

      await newProduct.save();
      res.status(200).send({
        message: "New Product added successfully",
        data: newProduct,
      });
    } else {
      res.status(400).send({ message: "No product found" });
    }
  } catch (error) {
    console.log(`Error in adding a product: ${error.message}`, error); // Log the error message and the full error object
    res.status(500).send({
      message: `SERVER Error in adding a product. Error: ${error.message}`, // Only include the error message in the response
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, sort } = req.query;

    // Build the query object
    let query = {};

    if (name) {
      query.$or = [
        { name: { $regex: name, $options: "i" } }, // Search name field
        { description: { $regex: name, $options: "i" } }, // Search description field
      ];
    }

    
    

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Define sort options
    let sortOptions = {};
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOptions.price = 1;
          break;
        case 'price_desc':
          sortOptions.price = -1;
          break;
        case 'rating':
          sortOptions.rating = -1;
          break;
        default:
          break;
      }
    }

    // Find products based on query
    const products = await productModel.find(query).sort(sortOptions);

    if (products.length === 0) {
      return res.status(402).send({ message: "No products found" });
    }

    res.status(200).send({ data: products });
  } catch (error) {
    console.error(`Error in searching products: ${error.message}`, error);
    res.status(500).send({
      message: `SERVER Error in searching products. Error: ${error.message}`,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();
    if(allProducts){
      res.status(201).send({message:"Products retreived successfully",
        allProducts
      })
    }
    else{
      res.status(404).send({message:"No product Found", error})
    }
  } catch (error) {
    res.status(502).send({message:"Something went wrong, Try again later"})
  }
};


export const getProduct = async(req, res)=>{
  try {
    const {productId} = req.body
    if(productId){
      const product = await productModel.findOne({_id:productId})
      if(product){
        res.status(200).send({product,
          message:"Retreived product successfully"
        })
      }else{
        res.send({
          message:"No product found"
        })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:"Something went wrong in retreiving the product",
      error
    })
  }
}

// controllers/productController.js






export const unlistProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    // Find and delete the product
    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove the image from Cloudinary
    await removeFromCloudinary(product.imagePublicId);

    return res.status(200).json({ message: 'Product unlisted successfully', product });
  } catch (error) {
    console.error('Error unlisting product:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


export const rateProduct = async (req, res) => {
  const { productId, rating } = req.body;

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update rating details
    product.rating.ratingCount += 1;
    product.rating.totalRating += rating;
    product.rating.averageRating = product.calculateAverageRating();

    // Save updated product
    await product.save();

    return res.status(200).json({ product });
  } catch (error) {
    console.error('Error rating product:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};