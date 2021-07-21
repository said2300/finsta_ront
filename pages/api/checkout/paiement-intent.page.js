import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const { amount } = req.body;

    const { id } = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
    });

    res.status(201).json({ id });
  } catch (error) {
    res.status(500).send(error);
  }
};
