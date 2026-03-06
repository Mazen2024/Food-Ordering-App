"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GetSubTotal } from "@/lib/Cart/cart";
import { formattCurrency } from "@/lib/formatters";
import { SelectedCartItems } from "@/Redux/features/cart/cartslice";
import { useAppSelector } from "@/Redux/hooks";

const CheckOutForm = ({ profile }: { profile: { [key: string]: any } }) => {
  const cart = useAppSelector(SelectedCartItems);

  const SubTotal = GetSubTotal(cart);

  const Delivery_Fees = 5;

  const TotalAmount = SubTotal + Delivery_Fees;

  const {form} = profile

  return (
    cart &&
    cart.length > 0 && (
      <div className="grid gap-6 bg-gray-100 rounded-md p-4">
        <h2 className="text-2xl text-black font-semibold">
          {profile.checkout}
        </h2>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="phone" className="text-gray-400">
                {form.phone.label}
              </Label>
              <Input
                id="phone"
                placeholder={form.phone.placeholder}
                type="text"
                name="phone"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="address" className="text-gray-400">
                {form.address.label}
              </Label>
              <Textarea
                id="address"
                placeholder={form.address.placeholder}
                className="resize-none"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="postal" className="text-gray-400">
                {form.postalCode.label}
              </Label>
              <Input
                id="postal"
                placeholder={form.postalCode.placeholder}
                type="text"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="city" className="text-gray-400">
                {profile.form.city.label}
              </Label>
              <Input
                id="city"
                placeholder={profile.form.city.placeholder}
                type="text"
                name="city"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="country" className="text-gray-400">
                {form.country.placeholder}
              </Label>
              <Input
                id="country"
                placeholder={form.country.placeholder}
                type="text"
                name="country"
              />
            </div>
            <Button type="button" className="h-10 my-8 font-bold">
              Pay {formattCurrency(TotalAmount)}
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

export default CheckOutForm;
