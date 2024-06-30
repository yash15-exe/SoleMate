import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentGateway = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
    });
    res.status(200).send({
      paymentIntent,
    });
    console.log("success");
  } catch (error) {
    res.status(500).send({
      message: "Intent creation failed",
      error,
    });
    console.log("Payment intent creation failed");
  }
};


