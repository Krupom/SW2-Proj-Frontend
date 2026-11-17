"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

type MapViewerProps = {
    lat: number;
    lng: number;
};

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function ResizeMap() {
    const map = useMap();

    useEffect(() => {
        const container = map.getContainer();
        const observer = new ResizeObserver(() => map.invalidateSize({ animate: false }));
        observer.observe(container);
        if (container.parentElement) observer.observe(container.parentElement);
        const frame = requestAnimationFrame(() => map.invalidateSize({ animate: false }));

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [map]);

    return null;
}

export default function MapViewer({ lat, lng }: MapViewerProps) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={20}
            style={{ height: "100%", width: "100%" }}
        >
            <ResizeMap />
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
                position={[lat, lng]}
                icon={markerIcon}
                interactive={false}
            />
        </MapContainer>
    );
}
