import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Languages } from "@/contants/enums";
import { Locale } from "@/i18n.config";
import { formattCurrency } from "@/lib/formatters";
import { Sizes } from "@/lib/generated/prisma/client";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

const PickSize = ({
  sizes,
  basePrice,
  selectedSize,
  setselectedSize,
  locale,
}: {
  sizes: Sizes[];
  basePrice: number;
  selectedSize: Sizes;
  setselectedSize: React.Dispatch<React.SetStateAction<Sizes>>;
  locale : Locale
}) => {

  return (
    <>
      <RadioGroup className="w-fit" dir={locale === Languages.ARABIC? 'rtl' : 'ltr'}>
        {sizes.map((item: Sizes) => (
          <div
            className="flex items-center space-x-1 border border-gray-100 rounded-md p-2"
            key={item.id}
          >
            <RadioGroupItem
              className="size-5 mx-4 border-gray-500"
              value={selectedSize.name}
              checked={Boolean(item.id === selectedSize.id)}
              id={item.id}
              onClick={() => setselectedSize(item)}
            />
            <Label
              className="font-bold text-gray-600"
              htmlFor={item.id}
            >{`${item.name} : ${formattCurrency(basePrice + item.price)}`}</Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

export default PickSize;
