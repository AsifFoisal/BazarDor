
import { Hind_Siliguri } from "next/font/google";
export const instant = false;
import CategoryProductsList from "./CategoryProductsList";
import { Suspense } from "react";
const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

interface Category {
    name: string;
    totalProducts: number;
    icon: string;
    nameBn: string;
}

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

const toBanglaNumber = (
    value: number | string | null | undefined
): string => {
    if (value === null || value === undefined || value === "") {
        return "";
    }

    return value.toString().replace(/[0-9]/g, (digit) => {
        return "০১২৩৪৫৬৭৮৯"[Number(digit)];
    });
};

export default async function CategoryProducts({ params, }: { params: { slug: string } }) {
    'use cache';
    const { slug } = await params;
    const [catRes, prodRes] = await Promise.all([
        fetch(`https://api.abcz.workers.dev/api/bazardor/categories/${slug}`),
        fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`

        ),
    ]);

    const category: Category = await catRes.json();
    const products: Product[] = await prodRes.json();

    return (
        <div
            className={`${banglaFont.className} w-full bg-[#f4f6f3] min-h-screen p-4 sm:p-6 lg:p-8 font-sans`}
        >
            <div className="max-w-7xl mx-auto space-y-6">


                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl">
                        {category.icon}
                    </div>

                    <div className="px-1">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {category.nameBn}
                        </h1>

                        <p className="text-sm text-gray-500 font-medium mt-0.5">
                            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                <Suspense
                    fallback={
                        <div className="p-6 text-center">
                            পণ্য লোড হচ্ছে...
                        </div>
                    }
                >
                    <CategoryProductsList products={products} />
                </Suspense>
                

            </div>
        </div>
    );
}

