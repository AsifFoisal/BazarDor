import { Hind_Siliguri } from "next/font/google";
import Link from "next/link";

const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

export default function NotFound() {
    return (
        <div className={`min-h-screen bg-[#f4f6f3] flex flex-col items-center p-4 ${banglaFont.className}`}>
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-center max-w-md w-full space-y-4">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto font-bold">
                    404
                </div>
                <h1 className="text-2xl font-bold text-gray-900">পেজটি পাওয়া যায়নি</h1>
                <p className="text-sm text-gray-500 font-medium">
                    আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা লিংকটি সঠিক নয়।
                </p>
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-block w-full py-3.5 bg-[#00873E] hover:bg-[#007335] text-white font-medium rounded-xl shadow-md transition text-center cursor-pointer"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}