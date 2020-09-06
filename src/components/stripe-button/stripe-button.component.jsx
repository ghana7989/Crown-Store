import React from 'react';
import StripeCheckout from "react-stripe-checkout"
import Key from "./key"



export const StripeCheckoutButton = ({ price }) => {
    const priceInCents = price * 100

    const OnToken = token => { console.log(token); alert("Payment Successful") }


    return (
        <StripeCheckout
            label="Pay Now"
            name="Crwn Store"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $ ${price}`}
            amount={priceInCents}
            panelLabel="Pay Now"
            token={OnToken}
            stripeKey={Key}
        />
    )
}