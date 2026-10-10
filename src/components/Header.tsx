import { Hind_Siliguri } from 'next/font/google';
import CategoryLink from './CategoruLink';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import HeaderSession from './HeaderSession';
interface Category {
    id: string;
    nameBn: string;
    icon: string;
}

const banglaFont = Hind_Siliguri({ subsets: ['bengali'], weight: ['400', '500', '600', '700'], });


export default async function Header() {
    'use cache'
    const CategoryData = async () => {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
        const data = await res.json();
        return data;
    }

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    const categories: Category[] = await CategoryData();


    return (
        <header className="w-full bg-[#FAFCFA] border-b border-gray-100 shadow-sm font-sans ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center">
                        <div className="bg-[#05893E] p-3 rounded-xl flex items-center justify-center shadow-md">
                            <Image src="/cart.png" alt="Logo" width={24} height={24} />
                        </div>
                        <div className="flex flex-col ml-3">
                            <h1 className={` ${banglaFont.className} text-xl font-bold text-gray-900 leading-tight`}>
                                বাজার দর
                            </h1>
                            <span className={`text-xs text-gray-500 font-medium mt-0.5 ${banglaFont.className}`}>
                                {date}
                            </span>
                        </div>
                    </Link>

                    <HeaderSession/>
                    

                </div>
            </div>

            <div className="bg-gray-50/60 border-t border-gray-100 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-8 overflow-x-auto no-scrollbar">
                        {categories.map((category: Category) => (
                            <Suspense key={category.id} fallback={<div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse" />}>

                                <CategoryLink
                                    key={category.id}
                                    category={category}
                                    fontClass={banglaFont.className}
                                />
                            </Suspense>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}