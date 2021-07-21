import React, { useState } from "react";

import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Layout } from "@components/core/Layout";
import { Text } from "@chakra-ui/react";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  return (
    <Layout>
      <Elements stripe={stripePromise}>
        <Text fontSize="3xl">Paiement de votre location</Text>
        <CheckoutForm />
      </Elements>
    </Layout>
  );
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [checkoutError, setCheckoutError] = useState();
  const [checkoutSuccess, setCheckoutSuccess] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/checkout/paiement-intent");
      //   const {
      //     error,
      //     paymentIntent: { status },
      //   } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      //     payment_method: {
      //       card: elements.getElement(CardElement),
      //     },
      //   });

      alert("Paiement recu");

      //   if (status === "succeeded") {
      //     setCheckoutSuccess(true);
      //     destroyCookie(null, "paymentIntentId");
      //   }
    } catch (err) {
      alert(err.message);
      setCheckoutError(err.message);
    }
  };

  if (checkoutSuccess) return <p>Payment successful!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <button type="submit" disabled={!stripe}>
        Pay now
      </button>

      {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
    </form>
  );
};
