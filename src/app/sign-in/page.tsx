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
import toast from "react-hot-toast";
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
        <div className={`min-h-screen bg-[#f4f6f3] flex flex-col items-center p-4 ${banglaFont.className}`}>

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
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        Google দিয়ে চালিয়ে যান
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleGithubSignIn}
                        className="w-full border border-gray-200 bg-[#fafbfa] hover:bg-gray-50 text-xs font-bold text-gray-800 rounded-xl py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <svg className="w-4 h-4 shrink-0 fill-current text-gray-900" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                        </svg>
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