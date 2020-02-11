import React from "react";

import "./cart-icon.styles.scss";

import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

// gets called everytime the state changes even it cartItems stays the same
// const mapStateToProps = ({cart: {cartItems}}) => ({
//   itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => {
//     accumulatedQuantity + cartItem.quantity, 0
//   })
// })

// prevents state from being called every time
// const mapStateToProps = state => ({
//   itemCount: selectCartItemsCount(state)
// });

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

// const mapStateToDispatch = dispatch => ({
//   toggleCartHidden: () => dispatch(toggleCartHidden())
// });

const mapStateToDispatch = {
  toggleCartHidden
};

export default connect(mapStateToProps, mapStateToDispatch)(CartIcon);
