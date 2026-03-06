import About from "@/components/about";
import Image from "next/image";

//// About Us Page
const AboutUsPage = () => {
  return (
    <main className="py-4 relative min-h-[85vh]">
      <About />
      <div className="-mt-12.5 flex justify-center items-center">
        <Image
          src={"/assets/images/AboutPizza.png"}
          width={700}
          height={400}
          alt="About-Image"
          // Override Lazy Loading Behavior
          loading="eager"
          className="object-cover z-[-999] opacity-80 absolute top-50"
        ></Image>
      </div>
    </main>
  );
};

export default AboutUsPage;
