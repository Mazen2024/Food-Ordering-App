import Image from "next/image";
import Custom_Link from "../customlink";
import { Languages, Routes } from "@/contants/enums";
import { buttonVariants } from "../ui/button";
import { ArrowRightCircle } from "lucide-react";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

const Hero = async () => {
  const locale = await getCurrentLocale();

  const { home } = await getTrans(locale);
  const { hero } = home;

  return (
    <section className="section-gap">
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div className="md:py-12">
          <h1 className="capitalize text-4xl font-semibold italic">
            {hero.title}
          </h1>
          <p className="text-gray-600 my-8">{hero.description}</p>
          <p className="text-gray-600 my-8">{hero.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <Custom_Link
              href={`${Routes.MENU}`}
              className={`${buttonVariants({ size: "lg" })} space-x-2! px-4! rounded-full! uppercase`}
            >
              {hero.orderNow}
              <ArrowRightCircle
                className={`w-6! h-6! ${locale === Languages.ARABIC ? "rotat-180" : ""}`}
              />
            </Custom_Link>
            <Custom_Link
              href={`${Routes.ABOUT}`}
              className="gap-2 flex items-center text-black hover:text-primary transition-all duration-200 font-semibold"
            >
              {hero.learnMore}
              <ArrowRightCircle className="w-6! h-6!" />
            </Custom_Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image
            src={"/assets/images/pizza.png"}
            fill
            alt="Hero-Image"
            // Override Lazy Loading Behavior
            loading="eager"
            className="object-contain"
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default Hero;
