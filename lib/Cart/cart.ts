import { CartItem } from "@/Redux/features/cart/cartslice";

///// Get Quantity For Item
export const GetItemQuantity = (id: string, cart: CartItem[]) => {
  return cart.find((ele) => ele.id === id)?.quantity || 0;
};

/// Get Sub Total For Cart
export const GetSubTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItem) => {
    /// Calc Extras Prices
    const extraTotal = cartItem.extras?.reduce(
      (sum, extra) => sum + (extra.price || 0),
      0,
    );

    /// Calc Total (Extra Price + Base Price + Size Price)
    const itemTotal =
      cartItem.basePrice + (extraTotal || 0) + (cartItem.sizes?.price || 0);

    /// Calc Final Total (Item Total * Quantity)

    return total + itemTotal * cartItem.quantity!;
  }, 0);
};
