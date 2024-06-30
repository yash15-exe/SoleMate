
import orderModel from "../Models/Order.model.js"

export const createOrder = async (req, res)=>{
    const {products, userId, orderAddress,customerName, paymentIntentId} = req.body
   try {
     if(products&&userId){
         const order = orderModel({
             user:userId,
             products,
             orderAddress,
             customerName,
             paymentIntentId
         })
         await order.save()
         res.status(200).send({
             message:"Order placed successfully "
         })
     }
     else{
         res.status(400).send({
             message:"Data not provided"
         })
     }
   } catch (error) {
    res.status(500).send({
        message:"Server side problem",
        error
    })
   }
}
// controllers/orderController.js


export const deletOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    await orderModel.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error });
  }
};

// controllers/orderController.js



export const getAllAdminOrders = async (req, res) => {
  const { status } = req.body; // Get the status from the request body

  try {
    // Build the query object based on the status
    const query = status ? { orderStatus: status } : {};

    // Find orders and populate the products and user fields
    const orders = await orderModel.find(query).populate('products').populate('user').exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    return res.status(200).json({
      orders,
      message: 'Orders retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};




// controllers/orderController.js




export const getAllUserOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await orderModel
      .find({ user: userId })
      .populate('products')
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};


// controllers/orderController.js


import stripe from 'stripe'; // Assuming you have installed and set up the Stripe SDK

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeClient = new stripe(stripeSecretKey);

export const cancelOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    // Find the order to be cancelled
    const order = await orderModel.findById(orderId).populate('user').exec();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order is eligible for cancellation (e.g., status is 'processing' or 'processed')

    // const refund = await stripeClient.refunds.create({
    //   payment_intent: order.paymentIntentId,
    // });

    // Update the order status to 'cancelled'
    order.orderStatus = 'cancelled';
    order.cancellationRequest = false
    await order.save();

    // Refund the money using Stripe

    return res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return res.status(500).json({ message: 'Server Error',error });
  }
};


 export const updateOrderStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { orderStatus: newStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const getOrdersForCancellationRequests = async (req, res) => {
  try {
    const ordersForCancellationRequests = await orderModel
      .find({ cancellationRequest: true })
      .populate('user', 'username '); // Populate the 'user' field with 'name' and '_id' fields

    if (!ordersForCancellationRequests || ordersForCancellationRequests.length === 0) {
      return res.status(401).json({ message: 'No orders with cancellation requests found' });
    }

    return res.status(200).json({ orders: ordersForCancellationRequests });
  } catch (error) {
    console.error('Error fetching orders with cancellation requests:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};



export const requestOrderForCancellation = async (req, res) => {
  const { orderId } = req.body;

  try {
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.cancellationRequest = true;
    await order.save();

    return res.status(200).json({ message: "Cancellation requested successfully" });
  } catch (error) {
    console.error("Error requesting cancellation:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


