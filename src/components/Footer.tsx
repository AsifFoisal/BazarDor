import { Hind_Siliguri } from "next/font/google";

const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

export default function Footer() {
    return (
        <footer className={"w-full bg-[#FAFCFA] border-t border-gray-200 py-4 text-xs sm:text-sm text-gray-600" + " " + banglaFont.className}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <p className="font-medium text-gray-700">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
                <p className="text-gray-500">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
}