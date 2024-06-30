import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productBrand:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
  imageUrl: {
    type: String,
    required: true,
  },
  availableUnits: {
    type: Number,
    default: 0,
  },
  unitsSold: {
    type: Number,
    default: 0,
  },

  rating: {
    ratingCount: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  imagePublicId:{
    type:String,
    required:true
  },
  taxRate:{
    type:Number,
    default:0.05
  }
  // Add more fields as needed
});

productSchema.methods.calculateAverageRating = function () {
  if (this.rating.ratingCount === 0) {
    return 0;
  } else {
    return this.rating.totalRating / this.rating.ratingCount;
  }
};

const productModel = mongoose.model("Product", productSchema);

export default productModel;
