import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const INITIAL_STATE = { cartItems: [] };

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        ({ product }) => product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
