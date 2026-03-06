"use client";
import { Pages, Routes } from "@/contants/enums";
import Custom_Link from "../customlink";
import { ShoppingCartIcon } from "lucide-react";
import { useAppSelector } from "@/Redux/hooks";
import { SelectedCartItems } from "@/Redux/features/cart/cartslice";
import { Locale } from "@/i18n.config";

const CartButtons = ({locale} : {locale : Locale}) => {
  const cart = useAppSelector(SelectedCartItems);  

  return (
    <Custom_Link
      href={`/${locale}${Routes.CART}`}
      className="relative flex group items-center mx-4"
    >
      <span className="absolute -top-1 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">
        {cart.length}
      </span>
      <ShoppingCartIcon className="text-sm text-gray-600 group-hover:text-primary duration-200 transition-all ease-in-out w-6! h-6!"></ShoppingCartIcon>
    </Custom_Link>
  );
};

export default CartButtons;
