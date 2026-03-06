import { cache } from "@/lib/Cash/Cache";
import { Prisma } from "@/lib/generated/prisma/client";
import { prismaObj } from "@/lib/prisma";

export const GetBestSeller = cache(
  (max?: number | undefined) => {
    const bestSellerItems = prismaObj.products.findMany({
      include: {
        sizes: true,
        extras: true,
      },
      /// Limit Number Of Items
      take: max,
      //// Order By Statement
      orderBy: {
        OrderProducts: {
          _count: "desc",
        },
      },
    });
    return bestSellerItems;
  },
  ["Best-Sellers"],
  { revalidate: 3600 },
);

export const GetAllCategories = cache(
  (max?: number | undefined) => {
    const AllCategories = prismaObj.categories.findMany({
      /// Limit Number Of Items
      take: max,
      include: {
        products: {
          include: { sizes: true, extras: true },
        },
      },
    });
    return AllCategories;
  },
  ["All-Categories"],
  { revalidate: 3600 },
);


export type ProductWithSizes_Extras = Prisma.productsGetPayload<{
  include: {
    sizes: true,
    extras : true
  }
}>
