import React from 'react';
import "./checkout-item.styles.scss"
import { connect } from 'react-redux';
import { clearItemFromCart, removeItem, addItem } from "../../redux/cart/cart.actions"

const CheckoutItem = ({ cartItem, clearItem, removeItem, addItem }) => {
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={cartItem.imageUrl} alt="item" />
            </div>
            <span className="name">{cartItem.name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className="value">
                    {cartItem.quantity}
                </span>
                <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
            </span>
            <span className="price">{cartItem.price}</span>
            <div className="remove-button" onClick={() => clearItem(cartItem)}>
                &#10005;
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clearItem: (item) => dispatch(clearItemFromCart(item)),
        removeItem: item => dispatch(removeItem(item)),
        addItem: item => dispatch(addItem(item))
    }
}


export default connect(null, mapDispatchToProps)(CheckoutItem);