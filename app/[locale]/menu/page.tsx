import MenuCard from "@/components/menu/MenuCard";
import { Languages } from "@/contants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { prismaObj } from "@/lib/prisma";
import { GetAllCategories } from "@/Server/DB/Products";

const MenuPage = async () => {
  const Categories = await GetAllCategories();

  const locale = await getCurrentLocale()

  // const pro = await prismaObj.categories.createMany({
  //   data: [
  //     {
  //       nameEN : "Unique Regional/Global Variations",
  //       nameAR : 'تنويعات إقليمية/عالمية مميّزة'
  //     },
  //   ],
  // });

  return (
    <main className="min-h-[85vh]">
      {Categories.map((catitem: any) => (
        <section className="container text-center section-gap" key={catitem.id}>
          <div className="my-6">
            <h1 className="text-primary text-4xl italic font-bold font-['cursive']">
              {locale === Languages.ARABIC ? catitem.nameAR : catitem.nameEN}
            </h1>
          </div>
          <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {catitem.products.map((proitem: any) => (
                <li
                  key={proitem.id}
                  className="p-6 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
                >
                  <MenuCard item={proitem} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </main>
  );
};

export default MenuPage;
