import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
function StripeButton({ price }) {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_cC3jSEejq0xOGFpJXPUYrLeP00RfetEFdz";

  const onToken = (token) => {
    console.log("Token", token);
    // alert("Payment Successful");
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert("payment Successful");
      })
      .catch((err) => {
        console.log("payment error: ", JSON.parse(err));
        alert(
          "There was an issue with your payment. Please sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing Ltd."
      description={`Your total is $${price}`}
      image="http://svgshare.com/i/CUz.svg"
      amount={priceForStripe}
      panelLabel="Pay Now"
      billingAddress
      shippingAddress
      token={onToken}
      stripeKey={publishableKey}
    ></StripeCheckout>
  );
}

export default StripeButton;
