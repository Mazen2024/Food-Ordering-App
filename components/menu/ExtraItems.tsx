import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formattCurrency } from "@/lib/formatters";
import { Extras } from "@/lib/generated/prisma/client";

const ExtraItems = ({
  extras,
  selectedExtras,
  setselectedExtras,
}: {
  extras: Extras[];
  selectedExtras: Extras[];
  setselectedExtras: React.Dispatch<React.SetStateAction<Extras[]>>;
}) => {
  
  /// Handle Check Extra Items

  const handleClick = (extraItem: Extras) => {
    if (selectedExtras.find((e) => e.id === extraItem.id)) {
      /// لو العنصر موجود في ال ARRAY الخاص بالاضافات وبالتالي كدا محاولة لعدم التحديد
      const filteredExtras = selectedExtras.filter(
        // Create Filtered Array Without This Elelment
        (ele) => ele.id !== extraItem.id,
      );
      setselectedExtras(filteredExtras);
    } else {
      /// لو العنصر مش موجود في ال ARRAY وتم تحديده يتم اضافته لل ARRAY مع الحفاظ علي العناصر السابقة
      // Add This Item To Seleceted Array
      setselectedExtras((prev) => [...prev, extraItem]);
    }
  };

  // console.log(selectedExtras);

  return (
    <>
      {extras.map((item: Extras) => (
        <div
          key={item.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <Checkbox
            checked={(selectedExtras.find((e) => e.id === item.id))? true : false}
            id={item.id}
            onClick={() => handleClick(item)}
          />
          <Label
            htmlFor={item.id}
            className="text-sm text-gray-600 font-bold leading-none"
          >
            {item.name} : {formattCurrency(item.price)}
          </Label>
        </div>
      ))}
    </>
  );
};

export default ExtraItems;
