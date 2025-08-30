import ChooseYourFormat from "@/components/product/database/choose-your-format";
import ProductDatabaseHero from "@/components/product/database/hero";
import WhyChooseUs from "@/components/product/database/why-choose-us";

export default function Page() {
  return (
    <>
      <ProductDatabaseHero />
      <WhyChooseUs />
      <ChooseYourFormat />
    </>
  );
}
