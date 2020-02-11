export const addItemToCart = (cartItems, cartItemToAdd) => {
  // .find() returns the first i
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  // check if item is found
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1
          }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (!existingCartItem) return;

  if (existingCartItem.quantity === 1)
    return clearCart(cartItems, cartItemToRemove);

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCart = (cartItems, cartItemToClear) =>
  cartItems.filter(cartItem => {
    // if id don't match, keep item
    return cartItem.id !== cartItemToClear.id;
  });
