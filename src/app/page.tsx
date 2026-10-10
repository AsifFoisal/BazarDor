import AllProduct from "@/components/AllProduct";
import Hero from "@/components/Hero";
import PriceDecreased from "@/components/PriceDecreased";
import PriceIncreased from "@/components/PriceIncreased";

export default function Home() {
  return (
    <div>
        <Hero/>
        <PriceIncreased/>
        <PriceDecreased/>
        <AllProduct/>
    </div>
  );
}
