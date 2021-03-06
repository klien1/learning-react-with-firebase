import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_iGgmk0iW6T7WgXPtrN67ddAp";

  // pass to backend to process the charge
  const onTonken = token => {
    console.log(token);
    alert("Payment Successful!");
  };

  return (
    <StripeCheckout
      label="Pay Now!"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}.`}
      amount={priceForStripe}
      panelLabel="Pay Here"
      token={onTonken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
