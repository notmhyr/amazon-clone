const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import requireAuth from "../../middleware/requireAuth";
import db from "../../utils/db";
import Order from "../../models/Order";
import moment from "moment";
const handler = async (req, res) => {
  console.log("function is running");
  const { _id } = req.user;
  await db.connect();
  try {
    const stripeOrders = await Order.find({ user: _id }).sort({
      createdAt: -1,
    });

    if (stripeOrders) {
      const orders = await Promise.all(
        stripeOrders.map(async (order) => {
          return {
            _id: order.session_id,
            amount: order.amount,
            amount_shipping: order.amount_shipping,
            images: order.images,
            timestamps: moment(order.createdAt).unix(),
            items: (
              await stripe.checkout.sessions.listLineItems(order.session_id, {
                limit: 100,
              })
            ).data,
          };
        })
      );
      res.status(200).json(orders);
    } else {
      console.log("user does not have any orders");
      throw Error("you have no orders");
    }
  } catch (error) {
    console.log(`error for orders: ${error}`);
    res.status(400).send({ error: error });
  }
};

export default requireAuth(handler);
