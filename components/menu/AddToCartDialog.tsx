"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import PickSize from "./PickSize";
import ExtraItems from "./ExtraItems";
import { useState } from "react";
import {
  Extras,
  products,
  ProSizes,
  Sizes,
} from "@/lib/generated/prisma/client";
import { formattCurrency } from "@/lib/formatters";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  addCartItem_increaseQuantity,
  removeCartItem_decreaseQuantity,
  removeItemFromCart,
  SelectedCartItems,
  UpdateCartItems,
} from "@/Redux/features/cart/cartslice";
import { GetItemQuantity } from "@/lib/Cart/cart";
import { Locale } from "@/i18n.config";
import { Languages } from "@/contants/enums";

const AddToCartDialog = ({
  id,
  img,
  // name,
  nameAR,
  nameEN,
  basePrice,
  desc,
  sizes,
  extras,
  locale,
  addTitle,
  sizestitle,
  extratitle,
  removeItem,
  saveChanges,
}: {
  id: string;
  img: string;
  // name: string;
  nameAR: string;
  nameEn : string;
  basePrice: number;
  desc: string;
  sizes: Sizes[];
  extras: Extras[];
  locale: Locale;
  addTitle: string;
  sizestitle: string;
  extratitle: string;
  removeItem: string;
  saveChanges: string;
}) => {
  /// Cart Items Instance
  const cart = useAppSelector(SelectedCartItems);

  /// Dispatch Action
  const dispatch = useAppDispatch();

  /// Default Size
  const defaultSize =
    cart.find((ele) => ele.id === id)?.sizes ||
    sizes.find((sizeItem: Sizes) => sizeItem.name === "SMALL");

  /// State For Initial Size & New Size ||| Only One Size Selected
  const [selectedSize, setselectedSize] = useState<Sizes>(defaultSize!);

  /// State For Extras & Handle Extras Change ||| Array Of Extras Selected
  const [selectedExtras, setselectedExtras] = useState<Extras[]>([]);

  //// Calc Total Below
  let total = basePrice;
  if (selectedSize) {
    total += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const ext of selectedExtras) {
      total += ext.price;
    }
  }

  /// Handle Add To Cart Click
  const handleAddToCart = () => {
    dispatch(
      addCartItem_increaseQuantity({
        nameAR,
        nameEN,
        img,
        basePrice,
        id,
        sizes: selectedSize,
        extras: selectedExtras,
      }),
    );
  };

  // console.log(cart);

  const ItemQuantity = GetItemQuantity(id, cart);

  return (
    // Modal
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            type="button"
            size={"lg"}
            className="mt-4 text-white rounded-full px-8!"
          >
            <span className="text-lg">{addTitle}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 overflow-y-auto max-h-[80vh]">
          <DialogHeader className="flex items-center">
            <div className="mx-auto">
              <Image
                src={img}
                alt="Modal-img"
                width={200}
                height={200}
                loading="eager"
                className="object-cover"
              ></Image>
            </div>
            <DialogTitle className="mb-4 mt-2">{locale === Languages.ENGLISH ? nameEN : nameAR}</DialogTitle>
            <DialogDescription className="text-center">
              {desc}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-10 my-4">
            <div className="text-center space-y-4">
              <Label
                htmlFor="pick-your-size"
                className="font-bold text-primary"
              >
                {sizestitle}
              </Label>
              <PickSize
                sizes={sizes}
                basePrice={basePrice}
                selectedSize={selectedSize}
                setselectedSize={setselectedSize}
                locale={locale}
              />
            </div>
            <div>
              <Label
                htmlFor="extras"
                className="font-bold mx-auto! text-primary my-4"
              >
                {extratitle}
              </Label>
              <ExtraItems
                extras={extras}
                selectedExtras={selectedExtras}
                setselectedExtras={setselectedExtras}
              />
            </div>
          </div>
          <DialogFooter>
            {ItemQuantity === 0 ? (
              <Button
                type="submit"
                className="w-full h-10 uppercase"
                onClick={handleAddToCart}
              >
                {addTitle}
                <span className="text-2xl text-lime-500 font-bold">
                  {formattCurrency(total)}
                </span>
              </Button>
            ) : (
              <ChooseQuantity
                qty={ItemQuantity}
                nameAR={nameAR}
                nameEN={nameEN}
                id={id}
                img={img}
                basePrice={basePrice}
                sizes={selectedSize}
                extras={selectedExtras}
                removeItem={removeItem}
                saveChanges={saveChanges}
              />
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

/// Increase & Decrease Quantity Component
const ChooseQuantity = ({
  qty,
  // name,
  nameAR,
  nameEN,
  id,
  img,
  basePrice,
  sizes,
  extras,
  removeItem,
  saveChanges,
}: {
  qty: number;
  // name: string;
  nameAR : string;
  nameEN : string;
  id: string;
  img: string;
  basePrice: number;
  sizes: Sizes;
  extras: Extras[];
  removeItem: string;
  saveChanges: string;
}) => {
  /// Dispatch Action
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center flex-col gap-2 w-full">
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <Button
          onClick={() => dispatch(removeCartItem_decreaseQuantity({ id: id }))}
          variant={"outline"}
          className="text-xl md:text-4xl cursor-pointer"
        >
          -
        </Button>
        <div>
          <span className="flex justify-center items-center bg-primary mr-0 md:mr-2 text-white p-2 rounded-2xl">
            {qty}
          </span>
        </div>
        <Button
          onClick={() =>
            dispatch(
              addCartItem_increaseQuantity({
                nameAR,
                nameEN,
                img,
                basePrice,
                id,
                sizes: sizes,
                extras: extras,
              }),
            )
          }
          variant={"outline"}
          className="text-xl md:text-3xl cursor-pointer"
        >
          +
        </Button>
      </div>
      <div className="flex gap-2 md:gap-8 flex-col md:flex-row">
        <Button
          onClick={() =>
            dispatch(
              removeItemFromCart({
                id: id,
              }),
            )
          }
          className="mt-4 font-semibold cursor-pointer"
          size={"lg"}
        >
          {removeItem}
        </Button>
        <Button
          onClick={() =>
            dispatch(
              UpdateCartItems({
                nameAR,
                nameEN,
                img,
                basePrice,
                id,
                sizes: sizes,
                extras: extras,
              }),
            )
          }
          className="mt-4 font-semibold cursor-pointer"
          size={"lg"}
        >
          {saveChanges}
        </Button>
      </div>
    </div>
  );
};

export default AddToCartDialog;
