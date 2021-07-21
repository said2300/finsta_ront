
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const { amount, currency } = JSON.parse(body);

    const { data } = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    // console.log({ data });

    res.status(201).json({ id: data.object.id });
  } catch (error) {
    res.status(500).send(error);
  }
};



     
  

    
 
  
  