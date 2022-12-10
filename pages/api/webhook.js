import { buffer } from "micro";
import Order from "../../models/Order";
import User from "../../models/User";
import db from "../../utils/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endPointSecret = process.env.STRIPE_SIGNIN_SECRET;

const pushOrderToDb = async (session) => {
  await db.connect();
  console.log("running push to db function");
  const user = await User.findOne({ email: session.metadata.email });

  if (user) {
    try {
      const newOrder = new Order({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        user: user._id,
        session_id: session.id,
      });
      const order = await newOrder.save();
      console.log(`Success order: ${session.id} has been added to DB`);
      return order;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw Error("user does not exist");
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("webhook handler running");
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // verify the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
    } catch (error) {
      console.log("error:", error);
      return res.status(400).send(`webhook error: ${error.message}`);
    }

    // handle checkout.session.completed event
    console.log(event.type);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      //push the order to database
      pushOrderToDb(session);
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
