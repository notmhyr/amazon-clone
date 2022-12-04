import { createContext, useEffect, useReducer } from "react";

export const Store = createContext();
const storage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart"))
    : null;

const initialState = {
  cart: {
    cartItems: storage ? storage : [],
    shippingAddress: {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ALL_ITEMS": {
      const cartItems = action.payload;
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.id === existItem.id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "REMOVE_CART_ITEM": {
      const targetItem = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== targetItem.id
      );
      localStorage.setItem("cart", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CLEAR_ALL_ITEMS": {
      console.log(`CLEAR_ALL_ITEMS run`);
      localStorage.removeItem("cart");
      const cartItems = [];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const value = { state, dispatch };
  // useEffect(() => {
  //   const storage = JSON.parse(localStorage.getItem("cart"));
  //   if (storage) {
  //     dispatch({ type: "ADD_ALL_ITEMS", payload: storage });
  //   }
  // }, []);

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
