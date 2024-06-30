import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName:{
    type:String,
    required:true
  },
  products: [{
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  }],
  orderAddress: {
    address:{
      type:String
    },
    city:{
      type:String
    },
    pincode:{
      type:String
    },
    state:{
      type:String
    },
    country:{
      type:String
    },
  },
  orderStatus: {
    type: String,
    enum: ["processing", "processed", "shipped", "delivered", "cancelled"],
    default: "processing",
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  paymentIntentId:{
    type:String
  },
  cancellationRequest:{
    type:Boolean,
    dafault:false
  }
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
