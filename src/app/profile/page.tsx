"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default function ProfileView() {
    const { data: session, isPending, refetch } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

    if (isPending) {
        return <div className="p-8 text-center text-gray-500">লোডিং...</div>;
    }

    const user = session?.user;

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        try {
            const { error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                setMessage({ type: "error", text: error.message || "আপডেট ব্যর্থ হয়েছে" });
            } else {
                setMessage({ type: "success", text: "সফলভাবে আপডেট করা হয়েছে!" });
                await refetch();
                window.dispatchEvent(new Event("auth-update")); // Refresh session to pull updated state
            }
        } catch (err) {
            setMessage({ type: "error", text: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।" });
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.dispatchEvent(new Event("auth-update"));
                    router.push("/");
                },
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#F0F4F1] p-6 md:p-12 text-gray-800">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="text-sm text-gray-500 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                {/* User Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src={user?.image as string}
                            alt="Profile"
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-2xl object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {user?.name || "ব্যবহারকারী"}
                            </h2>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition"
                    >
                        <span>←</span> সাইন আউট
                    </button>
                </div>

                {/* Update Form Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">তথ্য</h3>

                    {message.text && (
                        <div className={`p-3 rounded-xl text-sm ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                            {message.text}
                        </div>
                    )}

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
                            className="w-full py-3.5 bg-[#00873E] hover:bg-[#007335] text-white font-medium rounded-xl shadow-md transition disabled:opacity-50"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}