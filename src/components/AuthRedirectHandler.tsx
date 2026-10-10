"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthRedirectHandler() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const error = searchParams.get("error");
        const message = searchParams.get("message");

        if (error === "unauthorized" || error === "AccessDenied") {
            toast.error("এই পেজটি দেখতে হলে প্রথমে সাইন ইন করতে হবে!");
        } else if (message) {
            toast.success(message);
        }
    }, [searchParams]);

    return null;
}