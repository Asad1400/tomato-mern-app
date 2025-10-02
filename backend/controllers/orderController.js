import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  // Change this to your actual frontend URL/port
  const frontend_url = "http://localhost:5173";  

  try {
    const newOrder = await orderModel.create({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    // Delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: e.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === true || success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: e.message,
    });
  }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

const updateOrders = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({
            success: true,
            message: "Order Status updated successfully"
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrders };
