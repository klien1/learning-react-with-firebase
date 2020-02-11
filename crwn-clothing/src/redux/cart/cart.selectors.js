import { createSelector } from "reselect";

// two types of selectors
// input and output selectors

// input selectors
const selectCart = state => state.cart;
export const selectCartItems = createSelector(
  /* [input selectors ]*/
  [selectCart],
  /* function that will return the value we want out of the selector */
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
// output selectors

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);
