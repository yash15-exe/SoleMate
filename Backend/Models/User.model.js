import mongoose,{Schema} from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    defaultAddress:{
        type:String,

    },
    otherAddresses:[{
        type:String
    }]
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
