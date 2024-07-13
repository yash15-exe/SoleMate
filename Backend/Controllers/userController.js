import userModel from "../Models/User.model.js"
import bcrypt from "bcrypt"
import { createToken } from "../Utilities/JwtUtility.js"
import productModel from "../Models/Product.model.js"

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await userModel.findOne({ username })
        if (existingUser) {
            res.status(401).send("User already exists, Please login Instead")
            return
        } else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new userModel({
                username,
                email,
                password: hashedPassword
            })
            await user.save()
            const token = await createToken({username}, { expiresIn: "7d" })
            res.status(200).send({
                message: "User registered successfully",
                data: token,
                user
            })
        }
    } catch (error) {
        res.status(501).send({
            message: "Something went wrong on our side in registering you",
            error
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        
        if (username) {
            const user = await userModel.findOne({ username })
            if (user) {
                const hashedPassword = user.password
                const isValidPassword = await bcrypt.compare(password, hashedPassword)
                if (isValidPassword) {
                    const token = await createToken({username}, { expiresIn: "7d" })
                    res.status(200).send({
                        message: "Logged In successfully",
                        token,
                        user
                    })
                } else {
                    res.status(400).send("Invalid Password")
                    return
                }
            } else {
                res.status(401).send({ message: "Invalid Username" })
                return
            }
        } else {
            res.status(402).send({ message: "Username can't be empty" })
            return
        }
    } catch (error) {
        res.status(502).send({
            message: "Something went wrong on our side",
            error
        })
    }
}
export const addToCart = async (req, res) => {
    try {
        const { username, productId } = req.body;

        if (!productId) {
            return res.status(400).send({ message: "Invalid product ID" });
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if the product is already in the user's cart
        if (user.cart.includes(productId)) {
            return res.status(400).send({ message: "Product already in cart" });
        }

        const product = await productModel.findOne({ _id: productId });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        user.cart.push(productId);
        await user.save();

        res.status(200).send({ message: "Product added to cart" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send({
            message: "Something went wrong on our side",
            error: error.message,
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            res.status(400).send({ message: "Username is required" });
            return;
        }

        const user = await userModel.findOne({ username }).populate('cart');

        if (!user) {
            res.status(402).send({ message: "User not found" });
            return;
        }

        res.status(200).send({
            message: "Successfully retrieved cart items",
            cartItems: user.cart
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong on our side",
            error
        });
    }
};

// controllers/userController.js


export const deleteFromCart = async (req, res) => {
  const { productId, username } = req.body;

  try {
    const user = await userModel.findOne({username});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the product from the user's cart
    user.cart = user.cart.filter(item => item.toString() !== productId);

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Product removed from cart', user,status:200 });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
