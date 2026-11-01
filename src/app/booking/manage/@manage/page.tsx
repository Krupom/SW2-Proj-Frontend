"use client";

import Image from "next/image";
import { useState } from "react";

export default function ManagePage() {
    const [isBookingsVisible, setIsBookingsVisible] = useState(true);

    return (
        <main className="bg-slate-100">
            <h1>
                <button
                    type="button"
                    className="flex w-full items-center justify-between pl-2 pr-2 text-left"
                    onClick={() => setIsBookingsVisible(!isBookingsVisible)}
                >
                    <span>Your Bookings</span>
                    <Image
                        src="/img/triangle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={`transition-transform duration-200 ${isBookingsVisible ? "rotate-180" : ""}`}
                    />
                </button>
            </h1>
            {isBookingsVisible && <section id="bookings-section" />}
        </main>
    );
}
