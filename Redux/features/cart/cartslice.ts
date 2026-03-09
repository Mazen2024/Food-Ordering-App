import { Extras, Sizes } from "@/lib/generated/prisma/client";
import { RootState } from "@/Redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Declare Cart Item Type
export type CartItem = {
  nameAR: string;
  nameEN: string;
  img: string;
  basePrice: number;
  id: string;
  quantity?: number;
  sizes: Sizes;
  extras: Extras[];
};

type CartState = {
  Cartitems: CartItem[];
};

/// Get Local Storage Items For Cart Initial State

let localItems = localStorage.getItem("CartItems");

const initialState: CartState = {
  Cartitems: localItems ? JSON.parse(localItems) : [],
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addCartItem_increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      //// Handle Add To Cart Logic

      /// Check Existing Item In Cart
      const existingItem = state.Cartitems.find(
        (ele) => ele.id === action.payload.id,
      );

      if (existingItem) {
        /// Increase Quantity + 1
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.sizes = action.payload.sizes;
        existingItem.extras = action.payload.extras;
      } else {
        /// Push New Cart Item To State
        state.Cartitems.push({ ...action.payload, quantity: 1 });
      }
    },

    //// Handle Remove Cart Item Logic
    removeCartItem_decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string }>,
    ) => {
      /// Check Existing Item In Cart
      const item = state.Cartitems.find((ele) => ele.id === action.payload.id);

      if (item) {
        // In Case Quantity = 1 (Delete Cart Item)
        if (item.quantity === 1) {
          state.Cartitems = state.Cartitems.filter(
            (ele) => ele.id !== action.payload.id,
          );
        }
        // In Case Quantity > 1 (Decrease Qty Only By 1)
        else {
          item.quantity! -= 1;
        }
      }
    },

    //// Handle Delete Icon To Remove Item Logic
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.Cartitems = state.Cartitems.filter(
        (ele) => ele.id !== action.payload.id,
      );
    },

    //// Handle Clear Cart Action
    clearCart: (state) => {
      state.Cartitems = [];
    },

    //// Handle Update Cart Items Action
    UpdateCartItems: (state, action: PayloadAction<CartItem>) => {
      //// Handle Add To Cart Logic

      /// Check Existing Item In Cart
      const existingItem = state.Cartitems.find(
        (ele) => ele.id === action.payload.id,
      );

      if (existingItem) {
        /// Increase Quantity + 1
        existingItem.quantity = existingItem.quantity || 0;
        existingItem.sizes = action.payload.sizes;
        existingItem.extras = action.payload.extras;
      }
    },
  },
});

export const {
  addCartItem_increaseQuantity,
  removeCartItem_decreaseQuantity,
  removeItemFromCart,
  clearCart,
  UpdateCartItems,
} = CartSlice.actions;

export default CartSlice.reducer;

export const SelectedCartItems = (state: RootState) => state.cart.Cartitems;
