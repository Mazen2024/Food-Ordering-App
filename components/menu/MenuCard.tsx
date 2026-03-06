import { formattCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartDialog from "./AddToCartDialog";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Languages } from "@/contants/enums";
import { ProductWithSizes_Extras } from "@/Server/DB/Products";

const MenuCard = async ({ item }: { item: ProductWithSizes_Extras }) => {
  const locale = await getCurrentLocale();

  const { menuItem, sizes, extrasIngredients } = await getTrans(locale);

  return (
    <>
      <div className="relative w-auto h-48 mx-auto mb-4">
        <Image
          src={item.image}
          alt="Item-Img"
          fill
          loading="eager"
          priority
          className="object-contain"
        ></Image>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-xl my-3">
          {locale === Languages.ARABIC ? item.nameAR : item.nameEN}
        </h4>
        <strong className="text-gray-500">
          {formattCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-sm text-gray-500 line-clamp-3 leading-6 text-start">
        {locale === Languages.ARABIC ? item.descriptionAR : item.descriptionEN}
      </p>
      <AddToCartDialog
        id={item.id}
        img={item.image}
        name={locale === Languages.ENGLISH ? item.nameEN : item.nameAR}
        basePrice={item.basePrice}
        desc={
          locale === Languages.ENGLISH ? item.descriptionEN : item.descriptionAR
        }
        sizes={item.sizes}
        extras={item.extras}
        locale={locale}
        addTitle={menuItem.addToCart}
        sizestitle={sizes}
        extratitle={extrasIngredients}
      />
    </>
  );
};

export default MenuCard;
