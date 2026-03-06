import getTrans from "@/lib/translation";
import MainHeading from "../main-heading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

//// About Us Component
const About = async () => {
  const { home } = await getTrans(await getCurrentLocale());

  return (
    <section className="section-gap">
      <div className="container text-center">
        <div className="text-center mb-6">
          <MainHeading
            title={home.about.aboutUs}
            subtitle={home.about.ourStory}
          />
        </div>
        <div className="text-center mx-auto w-[85%] text-[#1e2f57] font-semibold leading-10 text-[20px]">
          <p>{home.about.descriptions.one}</p>
          <p className="my-6">{home.about.descriptions.two}</p>
          <p>{home.about.descriptions.three}</p>
          <p className="my-6">{home.about.descriptions.one}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
