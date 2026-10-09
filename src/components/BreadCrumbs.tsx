import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface BreadCrumbsProps {
    product: {
        nameBn: string;
        category: string;
    };
}



const BreadCrumbs = async ({ product }: BreadCrumbsProps) => {

    const categoryData = async () => {
        const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
        const data = await res.json();
        return data;
    }

    const categories: { nameBn: string; id: string }[] = await categoryData();
    const currentCategory = categories.find(
        (category) => category.id === product.category
    );

    return (
        <div className="text-xs sm:text-sm text-gray-500 flex items-center space-x-2 space-x-reverse font-medium">
            <Link href="/" className="hover:underline">হোম</Link>
            <span> <Image src={"/Vector.svg"} alt="Arrow Right" width={6} height={7} /> </span>
            {
                currentCategory && (
                    <Link className="hover:underline" href={`/category/${currentCategory.id}`}>{currentCategory.nameBn}</Link>
                )
            }
            <span> <Image src={"/Vector.svg"} alt="Arrow Right" width={6} height={7} /> </span>
            <span className="text-gray-800 px-2">{product.nameBn}</span>
        </div>
    );
};

export default BreadCrumbs;