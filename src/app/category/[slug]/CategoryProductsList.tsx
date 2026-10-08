"use client";

import { useState } from "react";

interface Product {
    id: string;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

interface ProductSortProps {
    products: Product[];
}

const toBanglaNumber = (value: number | string | undefined) => {
    if (value == null) {
        return '';
    }
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

export default function CategoryProductsList({ products }: ProductSortProps) {
    const [sortOrder, setSortOrder] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low-to-high") {
            return a.today - b.today;
        }

        if (sortOrder === "high-to-low") {
            return b.today - a.today;
        }

        return 0;
    });

    return (
        <>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-end">
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <span className="text-gray-600 font-medium px-2">
                        সাজান
                    </span>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium cursor-pointer"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-to-high">দাম: কম থেকে বেশি</option>
                        <option value="high-to-low">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 font-medium px-1">
                মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                    <div
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


                            <div className="bg-[#F0F5F0] text-[#D03739] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                                <span className="text-[10px]">▲</span>

                                <span>
                                    {toBanglaNumber(product.change.pct)}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

