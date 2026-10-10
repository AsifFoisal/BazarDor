"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryLink({
    category,
    fontClass,
}: {
    category: {
        id: string;
        icon: string;
        nameBn: string;
    };
    fontClass: string;
}) {
    const pathname = usePathname();

    const isActive = pathname === `/category/${category.id}`;

    return (
        <Link
            href={`/category/${category.id}`}
            className={`${fontClass} ${isActive
                    ? "text-green-700 bg-green-100"
                    : "text-gray-700 hover:bg-gray-100"
                } px-3 py-2 rounded-md`}
        >
            {category.icon} {category.nameBn}
        </Link>
    );
}