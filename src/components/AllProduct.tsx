import { Hind_Siliguri } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";

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

async function AllProductContent() {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    const products: Product[] = await res.json();

    return (
        <>
            <div className="gap-1 mb-6 space-y-3">
                <h2 className="text-xl sm:text-xl font-bold text-gray-900">
                    সব পণ্য
                </h2>
                <p className="text-[14px] font-regular text-[#5C655E]">মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="bg-[#FAFCFA] rounded-2xl p-5 shadow-sm border border-gray-100/80 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-xl bg-[#F0F5F0] flex items-center justify-center text-2xl shrink-0">
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

                            <div
                                className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1 ${product.change.dir === "up"
                                        ? "bg-[#FEF2F2] text-[#D03739]"
                                        : product.change.dir === "down"
                                            ? "bg-[#F0FDF4] text-[#16A34A]"
                                            : "bg-[#F5F5F5] text-[#737373]"
                                    }`}
                            >
                                <span className="text-[10px]">
                                    {product.change.dir === "up"
                                        ? "▲"
                                        : product.change.dir === "down"
                                            ? "▼"
                                            : "−"}
                                </span>

                                <span>{toBanglaNumber(product.change.pct)}%</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

function AllProductSkeleton() {
    return (
        <>
            <div className="gap-1 mb-6 space-y-3">
                <div className="h-7 w-28 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 w-44 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div
                        key={item}
                        className="bg-[#FAFCFA] rounded-2xl p-5 shadow-sm border border-gray-100/80 flex flex-col justify-between animate-pulse"
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
                            <div className="space-y-2 px-3 w-full">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>
                        </div>

                        <div className="flex items-end justify-between mt-6">
                            <div className="space-y-1 w-1/2">
                                <div className="h-3 bg-gray-200 rounded w-1/3" />
                                <div className="h-5 bg-gray-200 rounded w-2/3" />
                            </div>
                            <div className="w-12 h-6 bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default async function AllProduct() {
    'use cache'

    return (
        <section id="সব-পণ্য" className={"w-full py-8 px-4 sm:px-6 lg:px-8 " + banglaFont.className}>
            <div className="max-w-7xl mx-auto">
                <Suspense fallback={<AllProductSkeleton />}>
                    <AllProductContent />
                </Suspense>
            </div>
        </section>
    );
}