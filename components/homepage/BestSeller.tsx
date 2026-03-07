import { prismaObj } from "@/lib/prisma";
import MainHeading from "../main-heading";
import MenuCard from "../menu/MenuCard";
import { GetBestSeller } from "@/Server/DB/Products";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

async function BestSeller() {
  /// Fetch DB Products
  const bestSellerItems = await GetBestSeller(6);

  // const cat = await prismaObj.sizes.createMany({
  //   data: [
  //     {
  //       name : 'SMALL',
  //       price : 30,
  //       productsId: "cmmcmbb0z00015geilr3wi5mp",
  //     },
  //     {
  //       name : 'MEDIUM',
  //       price : 40,
  //       productsId: "cmmcmbb0z00015geilr3wi5mp",
  //     },
  //     {
  //       name : 'LARGE',
  //       price : 50,
  //       productsId: "cmmcmbb0z00015geilr3wi5mp",
  //     },
  //   ],
  // });

  // const bestSellerItems = [
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Pizza 1",
  //     description: "In pizza terms, it means the rim or edge crust on a pizza. crumb: the soft, webbed, inner portion of the crust made up of the breads hole structure",
  //     image: "/assets/images/Pro1.jpg",
  //     basePrice: 120.222222223,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Pizza 2",
  //     description: "In pizza terms, it means the rim or edge crust on a pizza. crumb: the soft, webbed, inner portion of the crust made up of the breads hole structure",
  //     image: "/assets/images/Pro3.png",
  //     basePrice: 312.9999999999,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Pizza 3",
  //     description: "In pizza terms, it means the rim or edge crust on a pizza. crumb: the soft, webbed, inner portion of the crust made up of the breads hole structure",
  //     image: "/assets/images/Pro2.jpg",
  //     basePrice: 715.512,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Pizza 4",
  //     description: "In pizza terms, it means the rim or edge crust on a pizza. crumb: the soft, webbed, inner portion of the crust made up of the breads hole structure",
  //     image: "/assets/images/Pro3.png",
  //     basePrice: 715.512,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Pizza 5",
  //     description: "In pizza terms, it means the rim or edge crust on a pizza. crumb: the soft, webbed, inner portion of the crust made up of the breads hole structure",
  //     image: "/assets/images/Pro2.jpg",
  //     basePrice: 715.512,
  //   },
  //   {
  //     id: crypto.randomUUID(),
  //     name: "Pizza 6",
  //     description: "In pizza terms, it means the rim or edge crust on a pizza. crumb: the soft, webbed, inner portion of the crust made up of the breads hole structure",
  //     image: "/assets/images/Pro1.jpg",
  //     basePrice: 715.512,
  //   },
  // ];

  const { home } = await getTrans(await getCurrentLocale());

  return (
    <section className="container section-gap">
      <div className="text-center mb-4">
        <MainHeading
          title={home.bestSeller.OurBestSellers}
          subtitle={home.bestSeller.checkOut}
        />
      </div>
      <div className="my-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {bestSellerItems.map((item: any) => (
            <li
              key={item.id}
              className="p-6 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
            >
              <MenuCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BestSeller;
