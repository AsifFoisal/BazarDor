import { Hind_Siliguri } from 'next/font/google';
import CategoryLink from './CategoruLink';
import Image from 'next/image';
import Link from 'next/link';
interface Category {
    id: string;
    nameBn: string;
    icon: string;
}

const banglaFont = Hind_Siliguri({ subsets: ['bengali'], weight: ['400', '500', '600', '700'], });


export default async function Header() {

    const CategoryData = async () => {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
        const data = await res.json();
        return data;
    }

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    
    const categories: Category[] = await CategoryData();
    return (
        <header className="w-full bg-white border-b border-gray-100 shadow-sm font-sans ">
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

                    <div className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            {/* <Image
                                src=""
                                alt="Rezwan"
                                fill
                                className="object-cover"
                            /> */}
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
                                Rezwan
                            </span>
                            {/* <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-transform group-hover:translate-y-0.5" /> */}
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-gray-50/60 border-t border-gray-100 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-8 overflow-x-auto no-scrollbar">
                        {categories.map((category: Category) => (
                            <CategoryLink
                                key={category.id}
                                category={category}
                                fontClass={banglaFont.className}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}