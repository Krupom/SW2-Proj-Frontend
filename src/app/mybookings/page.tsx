import BookingList from "@/components/BookingList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function MyBookingsPage() {
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
