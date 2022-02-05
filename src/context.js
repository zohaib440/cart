// Why do we use useReducer in React?
// useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.
// What is useReducer action?
// useReducer returns an array that holds the current state value and a dispatch function, to which you can pass an action and later invoke. ... We dispatch action objects to that reducer only, whereas in Redux, the dispatch function sends the action object to the store.

import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  // const [cart, setCart] = useState(cartItems);
  const [state, dispatch] = useReducer(reducer, initialState);

  // clear cart function to delete all items
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // remove  function to delete  item, payload is for id
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  // increase amount of items
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  // decrease amount of items
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };
  // in order to get total amount if we increase or decrease items
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  // fetching data
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//custom hook,  make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
