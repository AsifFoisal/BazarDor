import { Hind_Siliguri } from "next/font/google";
import Link from "next/link";
import CategoryProductsList from "./CategoryProductsList";
import { Suspense } from "react";
import CategoryProductsSkeleton from "./CategoryProductsSkeleton";
export const instant = false
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
        fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${slug}`),
        fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`),
    ]);

    // If fetch fails or category is not found, return the 404 state directly outside any try/catch JSX block
    if (!catRes.ok || !prodRes.ok) {
        return <NotFoundState fontClass={banglaFont.className} />;
    }

    const categoryJson = await catRes.json();
    const productsJson = await prodRes.json();

    const category: Category = categoryJson.data || categoryJson;
    const products: Product[] = productsJson.data || productsJson;

    if (!category || !category.nameBn) {
        return <NotFoundState fontClass={banglaFont.className} />;
    }

    return (
        <div className={`${banglaFont.className} w-full bg-[#f4f6f3] min-h-screen p-4 sm:p-6 lg:p-8 font-sans`}>
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl">
                        {category.icon || "📦"}
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

                
                <Suspense fallback={<CategoryProductsSkeleton/>}>
                    <CategoryProductsList products={products} />
                </Suspense>

            </div>
        </div>
    );
}

// 404-style error fallback component
function NotFoundState({ fontClass }: { fontClass: string }) {
    return (
        <div className={`${fontClass} w-full bg-[#f4f6f3] min-h-screen flex items-center justify-center p-4`}>
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-center max-w-md w-full space-y-4">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                    ⚠️
                </div>
                <h2 className="text-2xl font-bold text-gray-900">কোনো ক্যাটাগরি পাওয়া যায়নি</h2>
                <p className="text-sm text-gray-500">
                    আপনি যে ক্যাটাগরি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
                </p>
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-block w-full py-3.5 bg-[#00873E] hover:bg-[#007335] text-white font-medium rounded-xl shadow-md transition"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}