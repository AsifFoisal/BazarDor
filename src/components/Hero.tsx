import { Hind_Siliguri } from "next/font/google";
import Image from "next/image";
const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
});

const banglaFont = Hind_Siliguri({ subsets: ['bengali'], weight: ['400', '500', '600', '700'], });


export default function Hero() {
    return (
        <section className={"w-full bg-[#FAFCFA] py-12 md:py-1 mt-4 rounded-3xl  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" + banglaFont.className}>
            <div className="">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

                   
                    <div className="flex-1 space-y-5 text-left">
                       
                        <div className="inline-block">
                            <span className={` ${banglaFont.className} bg-[#e6f4ea] text-[#05893E] text-sm font-medium px-4 py-1.5 rounded-full`}>
                                {date}
                            </span>
                        </div>

                     
                        <h1 className={`text-3xl sm:text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight ${banglaFont.className}`}>
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                      
                        <p className={` ${banglaFont.className} text-gray-600 text-base sm:text-lg leading-relaxed`}>
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <div className="pt-2">
                            <button
                                type="button"
                                className="bg-[#05893E] hover:bg-[#007339] text-white font-medium text-base px-6 py-3 rounded-xl shadow-md transition-all duration-200 active:scale-95"
                            >
                                সব পণ্য দেখুন
                            </button>
                        </div>
                    </div>

              
                    <div className="flex-1 flex justify-center md:justify-end w-full max-w-md">
                        <div className="relative w-full max-w-[320px] sm:max-w-90">
                            <Image src="/bazar-hero.png" alt="Hero Illustration" width={420} height={360}/>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}