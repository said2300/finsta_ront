import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    // const { amount, currency } = JSON.parse(body);

    // const { client_secret } = await stripe.paymentIntents.create({
    //   amount,
    //   currency
    // })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            confirm: false,
            currency: "eur",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success.html",
      cancel_url: "https://example.com/cancel.html",
    });

    res.status(201).json({ id: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};
