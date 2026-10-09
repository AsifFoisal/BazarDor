import { Hind_Siliguri } from "next/font/google";
import Link from "next/link";
const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

interface Product {
    id: string;
    nameBn: string;
    today: number;
    unit: string;
    change: {
        dir: "up" | "down";
        pct: number;
    };
    image: string;
}

const toBanglaNumber = (value: number | string) => {
    const digits = "০১২৩৪৫৬৭৮৯";

    return value.toString().replace(/[0-9]/g, (digit) => {
        return digits[Number(digit)];
    });
};

const unitInBangla: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    kilograms: "কেজি",
    g: "গ্রাম",
    gram: "গ্রাম",
    grams: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    liters: "লিটার",
    litres: "লিটার",
    piece: "টি",
    pieces: "টি",
    dozen: "ডজন",
};

export default async function PriceDecreased() {
    'use cache'
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const products: Product[] = await res.json();

    const decreasedProducts = products
        .filter((product) => product.change.dir === "down")
        .slice(0, 6);

    return (
        <section className={"w-full py-8 px-4 sm:px-6 lg:px-8 " + banglaFont.className}>
            <div className="max-w-7xl mx-auto">

              
                <div className="flex items-center gap-1 mb-6">
                    <span className="text-[#1A9951] text-[16px]">▼</span>

                    <h2 className="text-xl sm:text-xl font-bold text-gray-900">
                        আজ দাম কমেছে
                    </h2>
                </div>

               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {decreasedProducts.map((product) => (
                        <Link
                            href={`/product/${product.id}`}
                            key={product.id}
                            className="bg-[#FAFCFA] rounded-2xl p-5 shadow-sm border border-gray-100/80 flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                       
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-xl bg-[#F0F5F0] flex items-center justify-center text-2xl flex-shrink-0">
                                    {product.image}
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-gray-900 px-3 leading-tight">
                                        {product.nameBn}
                                    </h3>

                                    <p className="text-xs text-gray-500 font-medium px-3 mt-1">
                                        {unitInBangla[product.unit.toLowerCase()] || product.unit}
                                    </p>
                                </div>
                            </div>

                          
                            <div className="flex items-end justify-between mt-4">
                                <div>
                                    <span className="text-xs text-gray-500 font-medium block mb-0.5">
                                        আজকের দাম
                                    </span>

                                    <div className="flex items-baseline space-x-1">
                                        <span className="text-lg font-bold text-gray-900">
                                            {toBanglaNumber(product.today)}
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            টাকা
                                        </span>
                                    </div>
                                </div>

                           
                                <div className="bg-[#F0F5F0] text-[#1A9951] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                                    <span className="text-[10px]">▼</span>

                                    <span>
                                        {toBanglaNumber(product.change.pct)}%
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
