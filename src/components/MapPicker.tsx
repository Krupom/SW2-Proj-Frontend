"use client";

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

type MapPickerProps = {
    lat: number;
    lng: number;
    onChange: (lat: number, lng: number) => void;
};

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapClickHandler({
    onChange,
}: {
    onChange: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(e) {
            onChange(e.latlng.lat, e.latlng.lng);
        },
    });

    return null;
}

function MapCenter({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng], map.getZoom(), { animate: false });
    }, [map, lat, lng]);

    return null;
}

export default function MapPicker({
    lat,
    lng,
    onChange,
}: MapPickerProps) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapCenter lat={lat} lng={lng} />
            <MapClickHandler onChange={onChange} />

            <Marker
                position={[lat, lng]}
                icon={markerIcon}
            />
        </MapContainer>
    );
}
