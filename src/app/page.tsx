import AllProduct from "@/components/AllProduct";
import Hero from "@/components/Hero";
import PriceDecreased from "@/components/PriceDecreased";
import PriceIncreased from "@/components/PriceIncreased";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div>
        <Hero/>
        <PriceIncreased/>
        <PriceDecreased/>
        <AllProduct/>
        <Toaster position="top-center"/>
    </div>
  );
}
