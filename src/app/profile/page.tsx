"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Hind_Siliguri } from "next/font/google";
import toast from "react-hot-toast";

const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

export default function ProfileView() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending) {
        return (
            <div className={`min-h-screen bg-[#F0F4F1] p-6 md:p-12 text-gray-800 ${banglaFont.className}`}>
                <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
                    <div>
                        <div className="h-9 w-44 bg-gray-200 rounded-lg" />
                        <div className="h-4 w-60 bg-gray-200 rounded-lg mt-2" />
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gray-200 shrink-0" />
                            <div className="space-y-2">
                                <div className="h-5 w-36 bg-gray-200 rounded-lg" />
                                <div className="h-4 w-48 bg-gray-200 rounded-lg" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <div className="h-10 w-36 bg-gray-200 rounded-xl" />
                            <div className="h-10 w-28 bg-gray-200 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const user = session?.user;

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("সফলভাবে লগ আউট হয়েছে।");
                        window.dispatchEvent(new Event("auth-update"));
                        router.push("/");
                    },
                },
            });
        } catch {
            toast.error("লগ আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করো।");
        }
    };

    return (
        <div className={`min-h-screen bg-[#F0F4F1] p-6 md:p-12 text-gray-800 ${banglaFont.className}`}>
            <div className="max-w-3xl mx-auto space-y-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="text-sm text-gray-500 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-4">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "Profile"}
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-2xl object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 text-xl font-bold">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {user?.name || "ব্যবহারকারী"}
                            </h2>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    


                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                            onClick={() => router.push("/profile/update")}
                            className="px-4 py-2 border border-emerald-600 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100 transition cursor-pointer"
                        >
                            অ্যাকাউন্ট আপডেট করুন
                        </button>

                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition cursor-pointer"
                        >
                            <span>←</span> সাইন আউট
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}