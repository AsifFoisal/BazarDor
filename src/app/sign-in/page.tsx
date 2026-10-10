"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Hind_Siliguri } from "next/font/google";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { signIn, useSession } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

export default function SignInPage() {
    const router = useRouter();
    const { isPending } = useSession();
    const [submitting, setSubmitting] = useState(false);

    // Skeleton loader while checking session/auth status
    if (isPending) {
        return (
            <div className={`min-h-screen bg-[#f4f6f3] flex flex-col items-center justify-center p-4 ${banglaFont.className}`}>
                <div className="w-full max-w-md bg-white border border-gray-100 shadow-sm rounded-2xl p-8 space-y-6 animate-pulse">
                    <div className="space-y-2 text-center">
                        <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto" />
                        <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
                    </div>
                    <div className="space-y-4 pt-4">
                        <div className="h-10 bg-gray-100 rounded-lg w-full" />
                        <div className="h-10 bg-gray-100 rounded-lg w-full" />
                        <div className="h-12 bg-gray-200 rounded-xl w-full" />
                    </div>
                </div>
            </div>
        );
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const loadingToast = toast.loading("সাইন ইন হচ্ছে...");

        try {
            const { error } = await signIn.email({
                email: data.email as string,
                password: data.password as string,
                callbackURL: "/",
            });

            toast.dismiss(loadingToast);

            if (error) {
                toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়!");
                setSubmitting(false);
                return;
            }

            toast.success("সফলভাবে সাইন ইন করা হয়েছে!");
            router.push("/");
            router.refresh();
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।");
            setSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("গুগল সাইন-ইন ব্যর্থ হয়েছে");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("গিটহব সাইন-ইন ব্যর্থ হয়েছে");
        }
    };

    return (
        <div className={`min-h-screen bg-[#f4f6f3] flex flex-col items-center justify-center p-4 ${banglaFont.className}`}>
            <Toaster position="top-center" />

            <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
                    সাইন ইন
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="w-full max-w-md bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        className="flex flex-col gap-1.5"
                        isRequired
                        name="email"
                        type="email"
                        validate={(val) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)) {
                                return "একটি সঠিক ইমেইল ঠিকানা প্রদান করুন";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-bold text-gray-700">ইমেইল</Label>
                        <Input
                            className="bg-[#fafbfa] border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#05893E]"
                            placeholder="you@example.com"
                        />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>

                    <TextField
                        className="flex flex-col gap-1.5"
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(val) => {
                            if (val.length < 8) {
                                return "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-bold text-gray-700">পাসওয়ার্ড</Label>
                        <Input
                            className="bg-[#fafbfa] border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#05893E]"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                        />
                        <FieldError className="text-xs text-red-500" />
                    </TextField>

                    <Button
                        className="w-full bg-[#05893E] text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-[#047233] transition-colors mt-2 cursor-pointer disabled:opacity-50"
                        type="submit"
                    >
                        {submitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                    </Button>
                </Form>

                <div className="relative my-6 flex items-center justify-center">
                    <div className="w-full border-t border-gray-200" />
                    <span className="absolute bg-white px-3 text-xs font-medium text-gray-400">
                        অথবা
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleGoogleSignIn}
                        className="w-full border border-gray-200 bg-[#fafbfa] hover:bg-gray-50 text-xs font-bold text-gray-800 rounded-xl py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        Google দিয়ে চালিয়ে যান
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleGithubSignIn}
                        className="w-full border border-gray-200 bg-[#fafbfa] hover:bg-gray-50 text-xs font-bold text-gray-800 rounded-xl py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        GitHub দিয়ে চালিয়ে যান
                    </Button>
                </div>

                <div className="text-center mt-6 text-xs font-semibold text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link className="text-[#05893E] hover:underline font-bold" href="/sign-up">
                        সাইন আপ করুন
                    </Link>
                </div>
            </div>

            <Link className="mt-6 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors" href="/">
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}