"use client";

import { useSession } from "@/lib/auth-client";
import { Avatar, Button, Popover } from "@heroui/react";
import { Hind_Siliguri } from "next/font/google";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const banglaFont = Hind_Siliguri({
    subsets: ["bengali"],
    weight: ["400", "500", "600", "700"],
});

export default function HeaderSession() {
    const { data: session, isPending, refetch } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleAuthUpdate = () => {
            refetch();
        };

        window.addEventListener("auth-update", handleAuthUpdate);
        return () => {
            window.removeEventListener("auth-update", handleAuthUpdate);
        };
    }, [refetch]);

    if (isPending) {
        return (
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                <div className="hidden h-4 w-20 animate-pulse rounded bg-gray-200 sm:block" />
            </div>
        );
    }

    if (session?.user) {
        const userInitial = session.user.name?.charAt(0).toUpperCase() || "U";

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
            <div className={"flex items-center gap-6"}>
                <Popover>
                    <Popover.Trigger aria-label="User profile menu">
                        <div className="flex items-center gap-2 cursor-pointer p-1 rounded-xl transition-colors hover:bg-gray-100/60">
                            <Avatar className="rounded" size="sm">
                                {session.user.image ? (
                                    <Avatar.Image
                                        alt={session.user.name || "User"}
                                        src={session.user.image}
                                    />
                                ) : null}
                                <Avatar.Fallback>{userInitial}</Avatar.Fallback>
                            </Avatar>
                            <div className="flex items-center gap-1">
                                <p className="text-sm font-semibold text-gray-800">
                                    {session.user.name || "User"}
                                </p>
                                <span className="text-xs text-gray-400">▾</span>
                            </div>
                        </div>
                    </Popover.Trigger>

                    <Popover.Content className="w-65 p-2 rounded-2xl bg-white shadow-xl border border-gray-100">
                        <Popover.Dialog>
                            <div className="mb-3">
                                <p className="font-bold text-base text-gray-900">
                                    {session.user.name}
                                </p>
                                <p className="text-xs text-gray-500 font-medium">
                                    {session.user.email}
                                </p>
                            </div>

                            <hr className="border-gray-100 my-2" />

                            <div className={`flex flex-col mt-2 ${banglaFont.className}`}>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-regular text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                >
                                    <span className="text-base">👤</span>
                                    <span>আমার প্রোফাইল</span>
                                </Link>

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleSignOut}
                                    className="flex items-center justify-start w-full gap-2 rounded-xl py-2 text-sm font-regular text-red-600 bg-transparent shadow-none hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                    <span className="text-base">↩</span>
                                    <span>সাইন আউট</span>
                                </Button>
                            </div>
                        </Popover.Dialog>
                    </Popover.Content>
                </Popover>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <Link
                href="/sign-in"
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
                সাইন ইন
            </Link>

            <Link
                href="/sign-up"
                className="rounded-lg bg-[#05893E] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#047233]"
            >
                সাইন আপ
            </Link>
        </div>
    );
}