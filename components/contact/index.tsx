import getTrans from "@/lib/translation";
import Custom_Link from "../customlink";
import MainHeading from "../main-heading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

const Contact = async () => {

    const { home} = await getTrans(await getCurrentLocale());


  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center mb-6">
          <MainHeading
            title={home.contact.contactUs}
            subtitle={home.contact["Don'tHesitate"]}
          />
        </div>
        <div className="mt-8 mx-auto text-center">
          <Custom_Link
            className="text-4xl underline text-gray-400"
            href="tel:+2012121212"
          >
            +2012121212
          </Custom_Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
