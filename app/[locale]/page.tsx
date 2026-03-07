import About from "@/components/about";
import Contact from "@/components/contact";
import BestSeller from "@/components/homepage/BestSeller";
import Hero from "@/components/homepage/Hero";

export default async function Home() {

  // const newsize = await prismaObj.products.create({
  //   data: {
  //     name: "Neapolitan Pizza",
  //     basePrice: 180.56,
  //     categoriesId : "1836",
  //     description : 'The original pizza from Naples, Italy, featuring a thin, soft, and bubbly crust cooked quickly in a wood-fired oven.',
  //     image : '/assets/images/Pro4.png',
  //   },
  // });  

  return (
    <main>
      <Hero />
      <BestSeller />
      <About />
      <Contact />
    </main>
  );
}
