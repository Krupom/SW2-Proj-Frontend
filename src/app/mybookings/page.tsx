import BookingList from "@/components/BookingList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function MyBookingsPage() {
    return (
        <Suspense fallback={<div className="p-5">Loading ... <LinearProgress /></div>}>
            <MyBookingsContent />
        </Suspense>
    );
}

async function MyBookingsContent() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.token) {
        redirect("/api/auth/signin");
    }
    const title = session?.user?.role === "admin" ? "Manage Bookings" : "My Bookings";

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">{title}</h1>
            <BookingList />
        </main>
    );
}
