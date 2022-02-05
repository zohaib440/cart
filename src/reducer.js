// state is current state before the update and action is what we are trying to do
// every functionality we want to run, it will be creat firty with type, then it will be passed to the reducer function to be run
// once we return from reducer that will be our new state, so we are just changing cart value to be empty array for clearCart

const reducer = (state, action) => {
  // in order to remove all items
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  // in order to remove one item
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  // in order to increase amount of items
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return {
          ...cartItem,
          amount: cartItem.amount + 1,
        };
      }
      return cartItem;
    });

    return {
      ...state,
      cart: tempCart,
    };
  }
  // in order to decrease amount of items and  chaining filter is used to remove item below amount 1
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            amount: cartItem.amount - 1,
          };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return {
      ...state,
      cart: tempCart,
    };
  }
  //   in order to change total and amount while adding, removing
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        console.log(price, amount);
        cartTotal.amount += amount;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    // in order to fixed , only 2 digits after decimal will be displayed
    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      total,
      amount,
    };
  }

  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      cart: action.payload,
      loading: false,
    };
  }

  return state;
};
export default reducer;
