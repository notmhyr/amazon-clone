const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_options: [{ shipping_rate: "shr_1M4WqQANUspyxXvr4c3Bg3vq" }],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/cart`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}
