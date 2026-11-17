import getFacility from "@/libs/getFacility";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MapViewer from "@/components/MapViewerWrapper";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function FacilityDetailPage({ params }: { params: Promise<{ fid: string }> }) {
    return (
        <Suspense fallback={<div className="p-5">Loading ... <LinearProgress /></div>}>
            <FacilityDetailContent params={params} />
        </Suspense>
    );
}

async function FacilityDetailContent({ params }: { params: Promise<{ fid: string }> }) {
    const { fid } = await params;
    const facilityDetail = await getFacility(fid);
    const facility = facilityDetail.data;
    const session = await getServerSession(authOptions);
    const hasToken = Boolean(session?.user?.token);
    const canBook = session?.user?.role === "member" && Boolean(session.user.token);
    return (
        <main className="w-full p-5">
            <h1 className="mb-10 text-center text-3xl font-bold">{facility.name}</h1>
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <div className="h-80 overflow-hidden rounded-lg bg-slate-100">
                    {facility.latitude != null && facility.longitude != null ? (
                        <MapViewer lat={facility.latitude} lng={facility.longitude} />
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                            Map location unavailable
                        </div>
                    )}
                </div>
                <div className="text-left text-lg leading-8 text-slate-800">
                    <p>Name: {facility.name}</p>
                    <p>Sport Type: {facility.sportType}</p>
                    <p>Location: {facility.location}</p>
                    <p>Capacity: {facility.capacity} people</p>
                    <p>Hourly Rate: ${facility.hourlyRate.toFixed(2)} per hour</p>
                </div>
            </div>

            <div className="mt-6 text-center">
            {canBook && (
                <Link
                    href={`/booking?facility=${fid}`}
                    className="inline-block rounded bg-blue-500 px-4 py-2 !text-white hover:bg-blue-700"
                >
                    Book Facility
                </Link>
            )}
            {!hasToken && (
                <Link href="/api/auth/signin" className="font-medium !text-blue-700 !underline">
                    Login to book
                </Link>
            )}
            </div>

        </main>
    );
}
