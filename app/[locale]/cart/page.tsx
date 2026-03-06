import { getCurrentLocale } from "@/lib/getCurrentLocale";
import CartItems from "./_components/cart-items";
import CheckOutForm from "./_components/checkout-form";
import getTrans from "@/lib/translation";

const CartPage =async () => {

  const locale = await getCurrentLocale()

   const { cart} = await getTrans(locale);
   const { profile} = await getTrans(locale);

  return (
    <main className="min-h-[85vh]">
      <section className="container">
        <div>
          <h1 className="text-4xl text-primary font-[cursive] text-center">
            {cart.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
          <CartItems trans= {cart} />
          <CheckOutForm profile = {profile}  />
        </div>
      </section>
    </main>
  );
};

export default CartPage;
