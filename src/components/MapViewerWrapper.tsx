"use client";

import dynamic from "next/dynamic";

const MapViewer = dynamic(
    () => import("@/components/MapViewer"),
    {
        ssr: false,
        loading: () => <p>Loading map...</p>,
    }
);

export default MapViewer;