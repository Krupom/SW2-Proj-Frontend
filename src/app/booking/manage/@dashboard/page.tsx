"use client";

import CreateFacilityForm from "@/components/CreateFacilityForm";
import Image from "next/image";
import { useState } from "react";

export default function DashboardPage() {
    const [isDashboardVisible, setIsDashboardVisible] = useState(true);

    return (
        <main className="bg-slate-100 border border-gray-300 w-full">
            <h1 className="m-0">
                <button
                    type="button"
                    className="flex w-full box-border items-center justify-between border-b border-gray-300 pl-2 pr-2 text-left"
                    onClick={() => setIsDashboardVisible(!isDashboardVisible)}
                >
                    <span>Your Dashboard</span>
                    <Image
                        src="/img/triangle.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={`transition-transform duration-200 ${isDashboardVisible ? "rotate-180" : ""}`}
                    />
                </button>
            </h1>
            {isDashboardVisible && (
                <CreateFacilityForm />
            )}
        </main>
    );
}
