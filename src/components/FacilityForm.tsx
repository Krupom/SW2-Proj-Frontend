"use client";

import createFacility from "@/libs/createFacility";
import updateFacility from "@/libs/updateFacility";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(
    () => import("@/components/MapPicker"),
    {
        ssr: false,
        loading: () => <p>Loading map...</p>,
    }
);

type FacilityFormProps = {
    facility?: Facility;
    onCompleted?: () => void;
};

const initFacility = {
    name: "",
    sportType: "",
    location: "",
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    capacity: 0,
    hourlyRate: 0,
};

export default function FacilityForm({ facility, onCompleted }: FacilityFormProps) {
    const { data: session } = useSession();
    const [formData, setFormData] = useState<UpdateFacilityInput>(initFacility);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isEditing = Boolean(facility);

    useEffect(() => {
        setFormData(facility ? {
            name: facility.name,
            sportType: facility.sportType,
            location: facility.location,
            latitude: facility.latitude,
            longitude: facility.longitude,
            capacity: facility.capacity,
            hourlyRate: facility.hourlyRate,
        } : initFacility);
        setError(null);
    }, [facility]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: name === "capacity" || name === "hourlyRate" || name === "latitude" || name === "longitude"
                ? value === "" ? undefined : Number(value)
                : value,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = session?.user?.token;

        if (!token) {
            setError("User is not authenticated.");
            return;
        }

        if (!formData.name || !formData.sportType || !formData.location || !formData.capacity || formData.capacity < 1 || formData.hourlyRate === undefined || formData.hourlyRate < 0) {
            setError("Please fill in all fields with valid values.");
            return;
        }

        if ((formData.latitude === undefined) !== (formData.longitude === undefined)) {
            setError("Enter both latitude and longitude, or leave both blank.");
            return;
        }

        setIsSubmitting(true);
        try {
            if (facility) {
                await updateFacility(facility._id, formData, token);
                alert("Facility updated successfully!");
            } else {
                await createFacility(formData as Required<UpdateFacilityInput>, token);
                setFormData(initFacility);
                alert("Facility created successfully!");
            }
            onCompleted?.();
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Failed to save facility.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-start px-4">
            <div className="my-2 flex w-full items-center">
                <label htmlFor="name" className="w-1/3">Name</label>
                <input type="text" id="name" name="name" required className="w-2/3 rounded border border-gray-300 px-2 py-1" onChange={handleInputChange} value={formData.name ?? ""} />
            </div>
            <div className="my-2 flex w-full items-center">
                <label htmlFor="sport-type" className="w-1/3">Sport Type</label>
                <input type="text" id="sport-type" name="sportType" required className="w-2/3 rounded border border-gray-300 px-2 py-1" onChange={handleInputChange} value={formData.sportType ?? ""} />
            </div>
            <div className="my-2 flex w-full items-center">
                <label htmlFor="capacity" className="w-1/3">Capacity</label>
                <input type="number" id="capacity" name="capacity" required min="1" className="w-2/3 rounded border border-gray-300 px-2 py-1" onChange={handleInputChange} value={formData.capacity ?? ""} />
            </div>
            <div className="my-2 flex w-full items-center">
                <label htmlFor="hourly-rate" className="w-1/3">Hourly Rate</label>
                <input type="number" id="hourly-rate" name="hourlyRate" required min="0" className="w-2/3 rounded border border-gray-300 px-2 py-1" onChange={handleInputChange} value={formData.hourlyRate ?? ""} />
            </div>
            <div className="my-2 mb-4 flex w-full items-center">
                <label htmlFor="location" className="w-1/3">Location</label>
                <input type="text" id="location" name="location" required className="w-2/3 rounded border border-gray-300 px-2 py-1" onChange={handleInputChange} value={formData.location ?? ""} />
            </div>
            <div className="my-2 mb-4 w-full">
                <label className="mb-2 block font-medium">
                    Select Location on Map
                </label>

                <MapPicker
                    lat={formData.latitude ?? 13.7563}
                    lng={formData.longitude ?? 100.5018}
                    onChange={(lat, lng) => {
                        setFormData((current) => ({
                            ...current,
                            latitude: lat,
                            longitude: lng,
                        }));
                    }}
                />
            </div>
            {error && <div className="mb-2 text-red-500">{error}</div>}
            <div className="flex w-full justify-end">
                <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : isEditing ? "Update Facility" : "Create Facility"}
                </button>
            </div>
            
        </form>
    );
}
