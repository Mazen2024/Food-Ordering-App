"use client";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n.config";
import { GetSubTotal } from "@/lib/Cart/cart";
import { formattCurrency } from "@/lib/formatters";
import getTrans from "@/lib/translation";
import {
  removeItemFromCart,
  SelectedCartItems,
} from "@/Redux/features/cart/cartslice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const CartItems = ({trans} : {trans : {[key : string] : string}}) => {
  const cart = useAppSelector(SelectedCartItems);

  const dispatch = useAppDispatch();

  const SubTotal = GetSubTotal(cart);

  const Delivery_Fees = 5;

  /// set Current Cart Items To Local Storage

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("CartItems", JSON.stringify(cart));
    }
  }, [cart]);

  // if (cart){console.log(cart);
  // }

  return (
    <div>
      {cart && cart.length > 0 ? (
        <>
          <ul className="md:py-10 py-2">
            {cart.map((item) => (
              <li key={item.id} className="my-8">
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                  <div className="flex items-center gap-5 md:gap-10">
                    <div className="relative w-24 h-24">
                      <Image
                        src={item.img}
                        className="object-contain"
                        alt={item.name}
                        fill
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold md:text-lg text-primary">
                        {item.name}
                      </h4>
                      <div className="relative mt-2">
                        {item.sizes && (
                          <span className="text-sm text-blue-700 font-bold">
                            Size : {item.sizes.name}
                            {"  =  "}
                            {formattCurrency(item.sizes.price)}
                          </span>
                        )}
                        {item.extras && item.extras.length > 0 && (
                          <div className="flex gap-1 items-center mt-2">
                            <p className="block font-bold pr-5">Extras : </p>
                            <ul className="flex flex-col justify-center">
                              {item.extras.map((extra) => (
                                <li key={extra.id}>
                                  <span className="text-sm text-gray-400">
                                    {extra.name} {formattCurrency(extra.price)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-2">
                          <span className="text-sm text-black font-bold">
                            Quantity : {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center gap-4 justify-end">
                    <strong className="text-black">
                      {formattCurrency(item.basePrice)}
                    </strong>
                    <Button
                      onClick={() =>
                        dispatch(
                          removeItemFromCart({
                            id: item.id,
                          }),
                        )
                      }
                      variant={"secondary"}
                      className="border"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-end items-end pt-6">
            <span className="text-gray-400 font-medium my-2">
              {trans.subTotal}
              <strong className="text-black mx-1">
                {formattCurrency(SubTotal)}
              </strong>
            </span>
            <span className="text-gray-400 font-medium my-1">
             {trans.DeliveryFees}
              <strong className="text-black mx-1">
                {formattCurrency(Delivery_Fees)}
              </strong>
            </span>
            <span className="text-gray-400 font-medium my-1">
              {trans.total}
              <strong className="text-black mx-1">
                {formattCurrency(SubTotal + Delivery_Fees)}
              </strong>
            </span>
          </div>
        </>
      ) : (
        <p className="font-bold text-2xl">{trans.noItemsInCart}</p>
      )}
    </div>
  );
};

export default CartItems;
