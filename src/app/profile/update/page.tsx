"use client";

import React, { useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Hind_Siliguri } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";

const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

export default function UpdateProfileForm() {
    const { data: session, isPending, refetch } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (isPending) {
        return (
            <div className={`min-h-screen bg-[#F0F4F1] p-6 md:p-12 text-gray-800 ${banglaFont.className}`}>
                <div className="max-w-xl mx-auto space-y-6 animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-7 w-48 bg-gray-200 rounded-lg" />
                            <div className="h-4 w-64 bg-gray-200 rounded-lg" />
                        </div>
                        <div className="h-4 w-28 bg-gray-200 rounded-lg" />
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                        <div className="space-y-2">
                            <div className="h-4 w-12 bg-gray-200 rounded-lg" />
                            <div className="h-12 w-full bg-gray-100 rounded-xl" />
                        </div>
                        <div className="h-12 w-full bg-gray-200 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    const user = session?.user;


    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        const loadingToast = toast.loading("আপডেট হচ্ছে...");

        try {
            const { error } = await authClient.updateUser({
                name,
            });

            toast.dismiss(loadingToast);

            if (error) {
                toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
                return;
            }

            await refetch();
            router.refresh();

            toast.success("আপডেট সফল হয়েছে!");

            router.push("/profile");
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className={`min-h-screen bg-[#F0F4F1] p-6 md:p-12 text-gray-800 ${banglaFont.className}`}>
            <Toaster position="top-center" />

            <div className="max-w-xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">প্রোফাইল আপডেট করুন</h1>
                        <p className="text-sm text-gray-500 mt-0.5">আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।</p>
                    </div>
                    <button
                        onClick={() => router.push("/profile")}
                        className="text-sm text-emerald-700 hover:underline font-medium cursor-pointer"
                    >
                        ← প্রোফাইলে ফিরে যান
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                নাম
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user?.name || ""}
                                key={user?.name}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-gray-800 bg-white transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#00873E] hover:bg-[#007335] text-white font-medium rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}